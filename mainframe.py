import tkinter as tk

#Functions

def loadData( load ):

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

    # "BP": BP, "HR": HR, "AHL": AHL, "BHL": BHL, "THL": THL

    load['BP']['text'] = "{} / {}".format(vals[0],  vals[1])
    load['HR']['text'] = str(vals[2])
    load['AHL']['text'] = "{} / {}".format(vals[3], vals[4])
    load['BHL']['text'] = "{} / {}".format(vals[5], vals[6])
    load['THL']['text'] = "{} / {}".format(vals[7], vals[8])
    load['GHL']['text'] = "{} / {}".format(vals[9], vals[10])













#GUI Drawing

top = tk.Tk()

top.geometry("400x400")

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

B = tk.Button(top, text = "Load Data", command = lambda : loadData( loadAbles ))    #unpacking tuple and sending
B.grid(row = 180 , column = 52 , ipadx = 10, ipady = 5)


top.mainloop()