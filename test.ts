interface Bird {
    fly()
    layEggs()
}

interface Fish {
    swim()
    layEggs()
}

function getSmallPet (): Bird | Fish {
    return {
        swim () {},
        layEggs () {}
    }
}