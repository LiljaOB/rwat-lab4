// Data1 and Data2 NOT known
// access reference, then get file name of data1, then in data1 get file name of data2.

// FIRST IMPLEMENTATION
// XMLHttpRequest Synchronous
function change1() {
    var ref = new XMLHttpRequest();
    var data1 = new XMLHttpRequest();
    var data2 = new XMLHttpRequest();
    var data3 = new XMLHttpRequest();
        
    ref.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var refObj = this.responseText;
            var parsed = JSON.parse(refObj);
            d1Location = parsed["data_location"];
        }
    };
    ref.open("GET", "https://liljaob.github.io/rwat-lab4/reference.json", false);
    ref.send();

    data1.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var data1Obj = this.responseText;
            var parsed = JSON.parse(data1Obj);
            d2Location = parsed["data_location"];
            var inner = 'D1';
            processData(parsed, inner);
        }
    };
    
    data1.open("GET", `https://liljaob.github.io/rwat-lab4/${d1Location}`, false);
    data1.send();

    data2.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var data2Obj = this.responseText;
            var parsed = JSON.parse(data2Obj);
            var inner = 'D2';
            processData(parsed, inner);
        }
    };
    data2.open("GET", `https://liljaob.github.io/rwat-lab4/${d2Location}`, false);
    data2.send();

    data3.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var data3Obj = this.responseText;
            var parsed = JSON.parse(data3Obj);
            var inner = 'D3';
            processData(parsed, inner);
        }
    };
    data3.open("GET", 'https://liljaob.github.io/rwat-lab4/data3.json', false);
    data3.send();

    function processData(parsed, inner) {
        // process data
        var display = '';
        parsed.data.forEach(function(item){
            display += '<tr><td>' + item.name + '</td><td>' + item.id + '</td><td>' + item.address + '</td><td>' + item.grades + '</td></tr>';
        });
        document.getElementById(inner).innerHTML = display;
    }
}

function change2() {
    // ASYNCHRONOUS IMPLEMENTATION
    var ref = new XMLHttpRequest();
    var data1 = new XMLHttpRequest();
    var data2 = new XMLHttpRequest();
    var data3 = new XMLHttpRequest();
    ref.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var refObj = this.responseText;
            var parsed = JSON.parse(refObj);
            d1Location = parsed["data_location"];
        }
    };
    ref.open("GET", "../data/reference.json", true);
    ref.send();

    data1.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var data1Obj = this.responseText;
            var parsed = JSON.parse(data1Obj);
            d2Location = parsed["data_location"];
            var inner = 'D1';
            processData(parsed, inner);
        }
    };
    data1.open("GET", `../data/${d1Location}`, true);
    data1.send();

    data2.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var data2Obj = this.responseText;
            var parsed = JSON.parse(data2Obj);
            var inner = 'D2';
            processData(parsed, inner);
        }
    };
    data2.open("GET", `../data/${d2Location}`, false);
    data2.send();

    data3.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var data3Obj = this.responseText;
            var parsed = JSON.parse(data3Obj);
            var inner = 'D3';
            processData(parsed, inner);
        }
    };
    data3.open("GET", '../data/data3.json', true);
    data3.send();

    function processData(parsed, inner) {
        // process data
        var display = '';
        parsed.data.forEach(function(item){
            display += '<tr><td>' + item.name + '</td><td>' + item.id + '</td><td>' + item.address + '</td><td>' + item.grades + '</td></tr>';
        });
        document.getElementById(inner).innerHTML = display;
    }
}

function change3() {
    // FETCH AND PROMISES IMPLEMENTATION
    const location1 = '';
    let myPromise = new Promise(function(myResolve, myReject) {
        fetch('https://liljaob.github.io/rwat-lab4/reference.json')
        .then((res) => {
            if(!res.ok) {
                throw new Error (`HTTP ERROR`);
            }
            return res.json();
        })
        .then((dataObj) => {
            location1 = dataObj['data_location'];
            console.log("1", location1);
            myResolve(location1);
        })
        .catch((error) => myReject(`JSON document could not be opened: ${error.message}`));
    });

    myPromise.then();  

    let myPromise2 = new Promise(function(myResolve, myReject) {
        fetch('https://liljaob.github.io/rwat-lab4/data1.json')
        .then((res) => {
            if(!res.ok) {
                throw new Error (`HTTP ERROR`);
            }
            return res.json();
        })
        .then((data) => {
            processData2(data, "D1");
        })
        .catch((error) => myReject(`JSON document could not be opened: ${error.message}`));
    });

    myPromise2.then();  

    let myPromise3 = new Promise(function(myResolve, myReject) {
        fetch('https://liljaob.github.io/rwat-lab4/data2.json')
        .then((res) => {
            if(!res.ok) {
                throw new Error (`HTTP ERROR`);
            }
            return res.json();
        })
        .then((data) => {
            processData2(data, "D2");
        })
        .catch((error) => myReject(`JSON document could not be opened: ${error.message}`));
    });

    myPromise3.then();  

    let myPromise4 = new Promise(function(myResolve, myReject) {
        fetch('https://liljaob.github.io/rwat-lab4/data3.json')
        .then((res) => {
            if(!res.ok) {
                throw new Error (`HTTP ERROR`);
            }
            return res.json();
        })
        .then((data) => {
            processData2(data, "D3");
        })
        .catch((error) => myReject(`JSON document could not be opened: ${error.message}`));
    });

    myPromise4.then();  

    function processData2(dataObj, inner) {
        // process data
        var display = '';
        dataObj.data.forEach(function(item){
            display += '<tr><td>' + item.name + '</td><td>' + item.id + '</td><td>' + item.address + '</td><td>' + item.grades + '</td></tr>';
        });
        document.getElementById(inner).innerHTML = display;
    }
}

    //header("Access-Control-Allow-Origin: *");

    /* function myPromise2(location) {
        return new Promise(function(myResolve2, myReject2) {
            fetch('https://liljaob.github.io/rwat-lab4/'+ location)
            .then((res) => {
                if(!res.ok) {
                    throw new Error (`HTTP ERROR`);
                }
                return res.json();
            })
            .then((dataObj) => {
                
                const location = data['data_location'];
                console.log(location);
                processData2(dataObj, 'fetchD1');
                return myPromise3(location);
            })
            .then((location) => {
                myResolve2(location);
            })
            .catch((error) => myReject2(`JSON document could not be opened: ${error.message}`));
        });
    } */

    /* myPromise2.then(
        function(location){console.log(location);},
        function(dataObj){
            console.log(dataObj);
            processData2(dataObj, 'fetchD1');
        }
    );   */

   /*  fetch('https://liljaob.github.io/rwat-lab4/reference.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network Error ' + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        const key = Object.keys(data);
        const location = data[key];
    })
    .catch((error) => console.error('Error getting JSON document', error)); */
