async function SendData() {
    var chassisSeries = document.getElementById("chassisSeries").value;
    var chassisNumber = document.getElementById("chassisNumber").value;

    PostChassis(chassisSeries, chassisNumber, 'chassis');

}

async function PostChassis(series, number, module) {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:9000/' + module + '/series/' + series + '/number/' + number, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var vehicleType = document.getElementById("type").value;
            var vehicleColor = document.getElementById("color").value;
            PostVehicle(vehicleType, vehicleColor, xhr.responseText.replaceAll('\"', ''), 'vehicles');
            return
        }
    }
    xhr.send();
}

async function PostVehicle(type, color, chassisId, module) {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:9000/' + module + '/type/' + type + '/color/' + color + '/chassis/' + chassisId, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            location.reload()
        }
    }
    xhr.send();
}