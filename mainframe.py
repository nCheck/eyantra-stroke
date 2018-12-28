import tkinter as tk
from tkinter import messagebox
import requests

#Functions

def openFiles():

    f1 = open('bp.txt', mode='r')
    f2 = open('ecg.txt', mode='r')

    vals = []

    for a,b in zip(f1,f2):
        bp = list(map( float, a.split(',') ))
        ecg = list(map(float, b.split(',')))

        vals.extend(bp)
        vals.extend(ecg)

    f1.close()
    f2.close()

    return vals


def loadData(load):

    vals = openFiles()

    # "BP": BP, "HR": HR, "AHL": AHL, "BHL": BHL, "THL": THL

    load['BP']['text'] = "{} / {}".format(vals[0],  vals[1])
    load['HR']['text'] = str(vals[2])
    load['AHL']['text'] = "{} / {}".format(vals[3], vals[4])
    load['BHL']['text'] = "{} / {}".format(vals[5], vals[6])
    load['THL']['text'] = "{} / {}".format(vals[7], vals[8])
    load['GHL']['text'] = "{} / {}".format(vals[9], vals[10])





def calData( ):

    vals = openFiles()


    prob = 45

    URL = "http://localhost:9966/api/test"

    data = {'prob': prob}

    # sending get request and saving the response as response object
    r = requests.post(url=URL, data=data)

    # extracting data in json format
    resp = r.json()

    print(resp)

    msg = messagebox.showinfo("Prediction", "There is {} % of Stroke".format(prob))




def sendData(patId):


    vals = openFiles()

    URL = "https://stroke-predict.herokuapp.com/api/upload"

    data = {
        "BP_sys": vals[0], "BP_dys": vals[1],
        "HR": vals[2], "AH": vals[3], "AL": vals[4],
        "BH": vals[5], "BL": vals[6], "TH": vals[7], "TL": vals[8],
        "GH": vals[9], "GL": vals[10], "patientId": patId
    }

    r = requests.post(url=URL, data=data)

    resp = r.json()
    print(resp)

    msg = messagebox.showinfo("Status", resp['status'])



def clearMe(event):

    event.widget.delete(0,10)



#GUI Drawing

top = tk.Tk()

top.geometry("500x500")

L1 = tk.Label(top, text = "BP (Sys/Dys)")
L1.grid(row = 60, column = 50, ipadx = 10, ipady = 10)

BP = tk.Label(top, text = "0 / 0")
BP.grid(row = 60, column = 60, ipadx = 10, ipady = 10)

L3 = tk.Label(top, text = "Heartrate")
L3.grid(row = 80, column = 50, ipadx = 10, ipady = 10)

HR = tk.Label(top, text = "0")
HR.grid(row = 80, column = 60, ipadx = 10, ipady = 10)

L5 = tk.Label(top, text = "Alpha(High/Low)")
L5.grid(row = 100, column = 50, ipadx = 10, ipady = 10)

AHL = tk.Label(top, text = "0 / 0")
AHL.grid(row = 100, column = 60, ipadx = 10, ipady = 10)

L7 = tk.Label(top, text = "Beta(High/Low)")
L7.grid(row = 120, column = 50, ipadx = 10, ipady = 10)

BHL = tk.Label(top, text = "0 / 0")
BHL.grid(row = 120, column = 60, ipadx = 10, ipady = 10)

L9 = tk.Label(top, text = "Theta(High/Low)")
L9.grid(row = 140, column = 50, ipadx = 10, ipady = 10)

THL = tk.Label(top, text = "0 / 0")
THL.grid(row = 140, column = 60, ipadx = 10, ipady = 10)

L11 = tk.Label(top, text = "Gamma(High/Low)")
L11.grid(row = 160, column = 50, ipadx = 10, ipady = 10)

GHL = tk.Label(top, text = "0 / 0")
GHL.grid(row = 160, column = 60, ipadx = 10, ipady = 10)




#Button for Loading

loadAbles = {"BP": BP, "HR": HR, "AHL":  AHL, "BHL":  BHL, "THL": THL, "GHL": GHL}




B = tk.Button(top, text = "Load Data", command = lambda : loadData(loadAbles))    #unpacking tuple and sending
B.grid(row = 180 , column = 52 , ipadx = 10, ipady = 5)


B = tk.Button(top, text = "Calculate", command = lambda : calData())    #sending Value
B.grid(row = 200 , column = 52 , ipadx = 10, ipady = 5)

E = tk.Entry(top, bd=5)    #sending Value
E.insert(0, "Patient Id")
E.bind('<Button-1>', clearMe)
E.grid(row = 220 , column = 52 , ipadx = 5, ipady = 5)

B = tk.Button(top, text = "Send Data", command = lambda : sendData( E.get() ))    #sending Value
B.grid(row = 240 , column = 52 , ipadx = 10, ipady = 5)


top.mainloop()