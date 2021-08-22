var PHYSICS=
{
    timeScale:0.01,
    scene:{
        gravity:-9.81
    },
    objects:[
        {
            shape:"sphere",
            collisions:true,
            weight:1,
            size:10,
            position:{
                x:-30,
                y:30,
                z:0
            },
            velocity:{
                x:20,
                y:0,
                z:0
            },
            acceleration:{
                x:0,
                y:0,
                z:0
            },
            jerk:{
                x:0,
                y:0,
                z:0
            },
            color:0x0000ff
        },
        {
            shape:"sphere",
            collisions:true,
            weight:1,
            size:10,
            position:{
                x:30,
                y:30,
                z:0
            },
            velocity:{
                x:-20,
                y:0,
                z:0
            },
            acceleration:{
                x:0,
                y:0,
                z:0
            },
            jerk:{
                x:0,
                y:0,
                z:0
            },
            color:0x0000ff
        }
    ]
}