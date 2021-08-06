async function Search() {
    const searchValue = document.getElementById('chassisId').value;

    const vehicleFind = await getApi('vehicles', searchValue);
    const chassisFind = await getApi('chassis', searchValue);

    PopulateFields(await vehicleFind, await chassisFind);
}
async function getApi(module, chassisId) {
    const data = await fetch("http://localhost:9000/" + module + "/chassisId/" + chassisId);

    if (data.ok) {
        return await data.json();
    } else {
        var toast = new bootstrap.Toast(document.getElementById('liveToast'))
        toast.show()
        return "";
    }
}

function PopulateFields(vehicle, chassis) {

    const chassiKeys = Object.keys(chassis)
    const lengthChassi = chassiKeys.length

    for (let j = 0; j < lengthChassi; j++) {
        const chassi = chassiKeys[j]
        if (chassi !== '_id') {
            document.getElementById(chassi).value = chassis[chassi]
        }
    }

    const keys = Object.keys(vehicle)
    const length = keys.length

    for (let i = 0; i < length; i++) {
        const key = keys[i]
        if (key !== '_id' && key !== 'chassisId') {
            document.getElementById(key).value = vehicle[key]
        }
    }

    document.getElementById('delete').disabled = false;

}

async function DeleteVehicle() {
    const chassisId = document.getElementById('chassisId').value;

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", 'http://localhost:9000/vehicles/chassisId/' + chassisId, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            location.reload()
        }
    }
    xhr.send();
}