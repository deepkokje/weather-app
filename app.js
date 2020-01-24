window.addEventListener('load',()=>{
    let long;
    let lat;
    let tempDesc = document.querySelector('.temp-desc');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let tempSection = document.querySelector('.temp');
    let tempSpan = document.querySelector('.temp span');
   
    if(navigator.geolocation){
        
                navigator.geolocation.getCurrentPosition(position=>{
                    long = position.coords.longitude;
                    lat = position.coords.latitude;
                    const proxy = `https://cors-anywhere.herokuapp.com/`
                    const api = `${proxy}https://api.darksky.net/forecast/ecb2d4c96454253e17b04c6cb51d07d3/${lat},${long}`;

                    fetch(api)
                    .then(response=>{
                       return  response.json();
                      })
                    .then(data=>{
                        console.log(data);
                        const {apparentTemperature , summary,icon} = data.currently;
                        tempDegree.textContent = apparentTemperature; 
                        tempDesc.textContent = summary;
                        locationTimezone.textContent =data.timezone;

                      setIcons(icon,document.querySelector(".icon"));

                        //cel to far
                        let celsius = (apparentTemperature - 32) * (5/9);
                        tempSection.addEventListener('click',()=>{
                            if(tempSpan.textContent ==='F'){
                                tempSpan.textContent = 'C';
                                tempDegree.textContent =Math.floor(celsius);
                            }else{
                                tempSpan.textContent ="F";
                                tempDegree.textContent =apparentTemperature;
                            }
                        })
                       
                    })
                });
    
    }
    function setIcons(icon,iconID){
        const skycons = new Skycons({color:'white'});
        const currentIcon = icon.replace( /-/g, "_").toUpperCase();
       
        skycons.play();

        return skycons.set(iconID,Skycons[currentIcon]);
    }
});