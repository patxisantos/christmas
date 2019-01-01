/*
Author: Robert Hashemian
http://www.hashemian.com/

Use of this code is hereby granted to anyone. No attribution is required.
********************************************************
Usage Sample:

<script language="JavaScript">
TargetDate = "12/31/2020 5:00 AM";
BackColor = "palegreen";
ForeColor = "navy";
CountActive = true;
CountStepper = -1;
LeadingZero = true;
DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
FinishMessage = "It is finally here!";
</script>
<script language="JavaScript" src="http://scripts.hashemian.com/js/countdown.js"></script>
*/

function calcage(secs, num1, num2) {
  s = ((Math.floor(secs/num1))%num2).toString();
  if (LeadingZero && s.length < 2)
    s = "0" + s;
  return "<b>" + s + "</b>";
}

function CountBack(secs) {
  if (secs < 0) {
    //document.getElementById("cntdwn").innerHTML = FinishMessage;
    if (i === TargetDates.length-1)
      return;
    i++;
    targetDate = TargetDates[i];
    secs = calculateSecs();
  }
  DisplayStr = DisplayFormat.replace(/%%D%%/g, calcage(secs,86400,100000));
  DisplayStr = DisplayStr.replace(/%%H%%/g, calcage(secs,3600,24));
  DisplayStr = DisplayStr.replace(/%%M%%/g, calcage(secs,60,60));
  DisplayStr = DisplayStr.replace(/%%S%%/g, calcage(secs,1,60));

  document.getElementById("cntdwn").innerHTML = DisplayStr;
  setTimeout("CountBack(" + (secs+CountStepper) + ")", SetTimeOutPeriod);
}

function putspan(backcolor, forecolor) {
 document.write("<span id='cntdwn' style='background-color:" + backcolor + 
                "; color:" + forecolor + "'></span>");
}

function calculateSecs(){
    var dthen = new Date(targetDate);
    var dnow = new Date();
    ddiff = new Date(dthen-dnow);
    gsecs = Math.floor(ddiff.valueOf()/1000);
    return gsecs;
}

if (typeof(BackColor)=="undefined")
  BackColor = "white";
if (typeof(ForeColor)=="undefined")
  ForeColor= "black";
if (typeof(TargetDates)=="undefined")
  TargetDates = ["12/28/2018 9:44 PM"];
if (typeof(DisplayFormat)=="undefined")
  DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
if (typeof(FinishMessage)=="undefined")
  FinishMessage = "";
if (typeof(LeadingZero)=="undefined")
  LeadingZero = true;

var i = 0;
var targetDate = TargetDates[0];
var CountStepper = -1;
var SetTimeOutPeriod = (Math.abs(CountStepper)-1)*1000 + 990;
putspan(BackColor, ForeColor);

CountBack(calculateSecs());