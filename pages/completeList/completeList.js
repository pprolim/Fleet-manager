async function getdata() {
    const vehicles = await getApi('vehicles');
    const chassis = await getApi('chassis');

    ShowCards(await vehicles, await chassis);

}
async function getApi(module) {
    const data = await fetch("http://localhost:9000/" + module + "");
    return await data.json();
}

function ShowCards(vehicleList, chassisList) {
    let card = '';
    let count = 0;
    for (let v of vehicleList) {
        card += '<div class="accordion-item"><h2 class="accordion-header" id="heading"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + v._id + '"><img src="../../assets/' + v.type + '.png" class="image'+v.type+'Type"><strong style="margin-right: 8px">Chassis ID:  </strong>' + v.chassisId + '</button></button></h2><div id="collapse' + v._id + '" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample"> <div class="accordion-body" id="contents"><strong>Chassis Series:</strong> ' + chassisList.find(c => c._id === v.chassisId).series + ' <strong>Chassis Number:</strong> ' + chassisList.find(c => c._id === v.chassisId).number + ' <strong>Vehicle Color:</strong> ' + v.color + ' <strong>Number of passengers:</strong> ' + v.passengers + ' <strong>Vehicle Type:</strong> ' + v.type + '</div></div></div>'
        count ++;
    }

    document.getElementById("list").innerHTML = card;
    document.getElementById("counter").innerHTML = count + " Vehicles registered";
}

getdata();