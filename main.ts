// promene na hybani
let interval = 50

//promene na radio
radio.setGroup(1)
radio.setTransmitPower(7)
radio.setFrequencyBand(50)

//promene
let xmod = 0
let zamek = false
let posilaciString = ""





//piny
let logo = false
let P0 = false
let P1 = false
let P2 = false


  pins.touchSetMode(TouchTarget.LOGO, TouchTargetMode.Capacitive)
 pins.touchSetMode(TouchTarget.P0, TouchTargetMode.Capacitive)
pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Capacitive)
pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Capacitive)


//Logo configuration
let logoPressed = false;
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    logoPressed = true;
});

input.onLogoEvent(TouchButtonEvent.Released, function () {
    if (logoPressed) {
        logoPressed = false;
        
        // Call your function here
        reverse();
    }
});

//revere
function reverse() {
    logo = true
}
//tempomat
input.onPinReleased(TouchPin.P0, function () {
    P0 = true
})
input.onPinReleased(TouchPin.P1, function () {
   P1 = true
})
input.onPinReleased(TouchPin.P2, function () {
   P2 = true
})
//funkce tlacitek



//zamek
input.onButtonPressed(Button.A, function () {

    if (zamek === true) {
        zamek = false
        basic.showNumber(0)

    } else {
        zamek = true
        basic.showNumber(1)

    }




})








input.onButtonPressed(Button.B, function () {
    basic.showNumber(5)

    radio.sendString(String.fromCharCode(255))


})


function pack(xmod: number) {

    xmod = Math.round(Math.map(xmod, -1023, 1023, 0, 255))

    posilaciString = posilaciString + String.fromCharCode(xmod)

}


let x = 0
let y = 0
basic.forever(function () {
    if (zamek) {
        y = input.acceleration(Dimension.Y)
        x = input.acceleration(Dimension.X)

        pack(y)
        pack(x)
       
        
        posilaciString = posilaciString + "0" + "B" 
        
        //reverse
        if(logo){
            posilaciString = posilaciString + "1"
            logo = false
        } else {
            posilaciString = posilaciString + "0"
        }
       
        if (P0) {
            posilaciString = posilaciString + "1"
            P0 = false
        } else {
            posilaciString = posilaciString + "0"
        }


        if (P1) {
            posilaciString = posilaciString + "1"
            P1 = false
        } else {
            posilaciString = posilaciString + "0"
        }


        if (P2) {
            posilaciString = posilaciString + "1"
            P2 = false
        } else {
            posilaciString = posilaciString + "0"
        }

      
       
       



        console.log(posilaciString)

        radio.sendString(posilaciString)
        posilaciString = ""

        basic.pause(interval)
    }
})
radio.onReceivedNumber(function (receivedNumber: number) {
    basic.showNumber(6)
})