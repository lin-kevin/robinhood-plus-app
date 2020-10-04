# WHEN COPYING TO GOOGLE CLOUD FUNCTIONS:
# - delete function call at bottom
# - add "self" argument 

# prototype dual moving average crossover

import pandas as pd
import numpy as np
from datetime import datetime 
import matplotlib.pyplot as plt 

plt.style.use('fivethirtyeight')

# experimenting with quandl's APPL data
import quandl
aapl = quandl.get("WIKI/AAPL") 

# filter for recency
AAPL = aapl[aapl.index > '2010-01-01']

# create simple moving average with short window 
smaShort = pd.DataFrame()
smaShort['Adj. Close'] = AAPL['Adj. Close'].rolling(window = 20).mean()

# create simple moving average with long window 
smaLong = pd.DataFrame()
smaLong['Adj. Close'] = AAPL['Adj. Close'].rolling(window = 200).mean()

# create new dataframe to store all data
data = pd.DataFrame()
data['AAPL'] = AAPL['Adj. Close']
data['smaShort'] = smaShort['Adj. Close']
data['smaLong'] = smaLong['Adj. Close']

# create function to signal when to buy/sell stock
def trade(data):
  buy = []
  sell = []
  flag = -1

  for i in range(len(data)):
    if data['smaShort'][i] > data['smaLong'][i]:
      if flag != 1:
        buy.append(data['AAPL'][i])
        sell.append(np.nan)
        flag = 1
      else:
        buy.append(np.nan)
        sell.append(np.nan)
    elif data['smaShort'][i] < data['smaLong'][i]:
      if flag != 0:
        buy.append(np.nan)
        sell.append(data['AAPL'][i])
        flag = 0
      else:
        buy.append(np.nan)
        sell.append(np.nan)
    else:
      buy.append(np.nan)
      sell.append(np.nan)

  return (buy, sell)

# store buy & sell data 
buy_sell = trade(data)
data['Buy Signal Price'] = buy_sell[0]
data['Sell Signal Price'] = buy_sell[1]

import math

# assess performance 
def assess(data):
  first = True
  buyPrice = 0
  sellPrice = 0
  tradeTotal = 0
  holdTotal = 0

  for i in range(len(data)):
    if not math.isnan(data['Buy Signal Price'][i]):
      buyPrice = data['Buy Signal Price'][i]
      print("buy: ", buyPrice)
      if first:
        holdTotal = buyPrice
        first = False
    elif not math.isnan(data['Sell Signal Price'][i]):
      sellPrice = data['Sell Signal Price'][i]
      print("sell: ", sellPrice)
      tradeTotal += (sellPrice - buyPrice)
  
  holdTotal = sellPrice - holdTotal

  return (tradeTotal, holdTotal)

print(assess(data))

# visualize 
plt.figure(figsize = (14, 7))
plt.title('Apple Adj. Close Price History | Buy & Sell Signals')
plt.plot(data['AAPL'], label = 'AAPL', linewidth=0.5)
plt.plot(data['smaShort'], label = 'smaShort', linewidth=0.5)
plt.plot(data['smaLong'], label = 'smaLong', linewidth=0.5)
plt.scatter(data.index, data['Buy Signal Price'], label = 'Buy', marker = '^', color = 'green')
plt.scatter(data.index, data['Sell Signal Price'], label = 'Sell', marker = 'v', color = 'red')
plt.xlabel('Date')
plt.ylabel('Adj. Close Price USD($)')
plt.legend(loc = 'upper left')
plt.show()



