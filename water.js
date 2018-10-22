
var rows, columns;

// get the 2 buffers
var current = [];
var previous = [];

// This is how much change there will be in the water ripple
var dampening = 0.78;

function mouseDragged()
{
    if(mouseX < 0 || mouseX > width)
    return;
    if(mouseY > height || mouseY < 0)
    return;
    current[mouseX][mouseY] = 255;
}


function setup()
{
    // use the p5 function to create a canvas
    alert("This is working");
    pixelDensity(1);
    createCanvas(200,200);
    // console.log(height);
    for(var y =0; y < height; y++)
    {
        current[y] = [];
        previous[y] = [];
        for(var x =0; x < width;x++)
        {
            current[y][x] = 0;
            previous[y][x] = 0;
            //console.log(x);
        }
    }
    previous[100][100] = 255;
}

function draw()
{
    background(0);
    loadPixels();
    for(var y =1; y < height-1;y++)
    {
        for(var x =1; x < width-1;x++)
        {
            current[y][x] = 
            (previous[y -1][x] +
            previous[y+1][x] +
            previous[y][x-1] +
            previous[y][x+1] +
            previous[y-1][x-1] +
            previous[y-1][x+1] +
            previous[y+1][x-1] +
            previous[y+1][x+1]) / 4 - current[y][x];

            current[y][x] = current[y][x] * dampening;
            var index = (y+x * height) * 4;
            pixels[index + 0] = current[y][x] * 255;
            pixels[index + 1] = current[y][x] * 255;
            pixels[index + 2] = current[y][x] * 255;
            
            pixels[index + 3] = 100;
        }
    }
    updatePixels();
    // Swap the current buffers
    var bufferTemp = previous;
    previous = current;
    current = bufferTemp;


}