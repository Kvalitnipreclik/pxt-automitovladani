
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

    xmod = Math.round(Math.map(xmod,-1023,1023,0,255))
   
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
       
        
        radio.sendString(posilaciString)
        posilaciString = ""

        basic.pause(interval)
    }
})
radio.onReceivedNumber(function(receivedNumber: number) {
    basic.showNumber(6)
})