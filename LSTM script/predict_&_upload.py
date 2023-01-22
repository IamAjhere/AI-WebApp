Silver = "SI=F"
Platinum = "PL=F"
Gold = "GC=F"

Metal = "Platinum"
getmetal = Platinum
modelmetal = Metal +'priceMax_model.h5'


##predict days
days = 30

import yfinance as yf
import pandas as pd
msft = yf.Ticker(getmetal)
hist = msft.history(period="max")
df = hist
df1 = df.reset_index()

df1 = df1.rename(columns={"Close": "Price"})
df2 = df1
df1 = df1[['Price']]

df2 = df2[['Date','Price']]
#df2['Date'] = pd.to_datetime(df2['Date']).df1.date
df2

import numpy as np
from sklearn.preprocessing import MinMaxScaler
scaler=MinMaxScaler(feature_range=(0,1))
df1=scaler.fit_transform(np.array(df1).reshape(-1,1))

##split data into train and test
training_size = int(len(df1)*0.8)
test_size = len(df1)-training_size
train_data,test_data = df1[0:training_size,:],df1[training_size:len(df1):1]

print(f"Training Data -", training_size, f"Test Data -", test_size )

import numpy
#convert an array of values into a dataset matrix
def create_dataset(dataset, time_step=1):
  dataX, dataY = [], []
  for i in range(len(dataset)-time_step-1):
    a = dataset[i:(i+time_step), 0]
    dataX.append(a)
    dataY.append(dataset[i+time_step,0])
  return numpy.array(dataX), numpy.array(dataY)

#reshape into X=t, t+1, t+2, t+3 and Y=t+4
time_step = 60
X_train, y_train = create_dataset(train_data, time_step)
X_test, y_test = create_dataset(test_data, time_step)

X_train = X_train.reshape(X_train.shape[0],X_train.shape[1],1)
X_test = X_test.reshape(X_test.shape[0],X_test.shape[1],1)

from tensorflow import keras
model = keras.models.load_model(f'{modelmetal}')

#prediction and check performance metrics
train_predict=model.predict(X_train)
test_predict=model.predict(X_test)

#back to original form
train_predict = scaler.inverse_transform(train_predict)
test_predict = scaler.inverse_transform(test_predict)
train_predict

#calculate RMSE perfomace metrics
import math
from sklearn.metrics import mean_squared_error
math.sqrt(mean_squared_error(y_train,train_predict))

math.sqrt(mean_squared_error(y_test,test_predict))

fulldata = len(test_data)
lastdays = fulldata - time_step
x_input = test_data[lastdays:].reshape(1,-1)
x_input.shape

temp_input=list(x_input)
temp_input=temp_input[0].tolist()

import matplotlib.pyplot as plt

look_back = time_step
trainPredictPlot = numpy.empty_like(df1)
trainPredictPlot[:, :] = np.nan
trainPredictPlot[look_back:len(train_predict)+look_back, :] = train_predict

testPredictPlot = numpy.empty_like(df1)
testPredictPlot[:, :] = numpy.nan
testPredictPlot[len(train_predict)+(look_back*2)+1:len(df1)-1, :] = test_predict

plt.title(Metal + " Trained And Test")
plt.plot(scaler.inverse_transform(df1), label='Real Data')
plt.plot(trainPredictPlot, label='Trained Data')
plt.plot(testPredictPlot, label='Test Data')
plt.legend()

#future prediction
lst_output=[]
n_steps= time_step
i=0
while(i<days):
  if(len(temp_input)>time_step):
    
    x_input=np.array(temp_input[1:])
    #print("{} day input {}".format(i,x_input))
    x_input = x_input.reshape(1,-1)
    x_input = x_input.reshape((1, n_steps,1))
    
    yhat = model.predict(x_input, verbose=0)
    #print("{} day out {}".format(i,yhat))
    temp_input.extend(yhat[0].tolist())
    temp_input=temp_input[1:]
    lst_output.extend(yhat.tolist())
    i=i+1
  else:
    x_input = x_input.reshape((1, n_steps, 1))
    yhat = model.predict(x_input, verbose=0)
    temp_input.extend(yhat[0].tolist())
    lst_output.extend(yhat.tolist())
    i=i+1



day_new=np.arange(1,time_step + 1)
day_pred = np.arange(time_step+1, time_step + 1 + days)

fdays = len(df1)
lstdays = fdays - time_step
lstdays

plt.plot(day_new,scaler.inverse_transform(df1[lstdays:]))
plt.plot(day_pred, scaler.inverse_transform(lst_output))

df3= df1.tolist()
df3.extend(lst_output)
df33 = scaler.inverse_transform(df3)
plt.plot(df33[round(len(df33)*0.5):])

lastoutputconvert = scaler.inverse_transform(lst_output)

formatted_list = [ '%.3f' % elem for elem in lastoutputconvert ]

df2.tail(1)["Date"]

new_day = df2.iloc[-1]["Date"]+ datetime.timedelta(days=1)
date_list = [new_day + datetime.timedelta(days=x) for x in range(days)]
new_day_end = date_list[len(date_list) - 1]

#create dataframe and merge it with the dates
newdf = pd.DataFrame(date_list, columns=["Date"])
pricelist = pd.DataFrame(formatted_list, columns=["Predicted_Price"])

merged_list = pd.merge(newdf, pricelist,left_index= True, right_index= True)
merged_list.reset_index(inplace=True)
data_dict = merged_list.to_dict("records")

import pymongo
from pymongo import MongoClient
uri = "" ## URI
client = MongoClient(uri)

db = client.test
col = db.predictions

col.delete_one({"Metal": Metal})

col.insert_one({"Metal":Metal ,"Predict_Start" : new_day,"Predicted_Days": days, "Predict_End" : new_day_end,"index" : data_dict})