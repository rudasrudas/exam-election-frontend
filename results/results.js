window.onload = () => {
    initResults();
}

function initResults() {
    const resultElement = document.querySelector(".results");

    fetch("https://electionx-backend.herokuapp.com/parties")
    .then(response => response.json())
    .then(parties => {

        //Remove anything there was before in the results div
        while(resultElement.children.length) resultElement.removeChild(resultElement.firstChild);

        //Sort so it looks nicer
        parties.sort(getSortOrder("votes"));

        //Find highest votes
        let max = 0;
        parties.forEach(party => {
            if(party.votes > max){
                max = party.votes;
            }
        });

        //Create elements
        parties.forEach(party => {
            const partyElement = document.createElement("div");
            partyElement.classList.add("row");
            partyElement.innerHTML = "<div class='title'>" + party.title + "</div>" +
            "<div class='area'>" + party.initial + "</div>" +
            "<div class='count'>" + party.votes + "</div>";
            const areaElement = partyElement.querySelector(".area");
            areaElement.style.backgroundColor = "#" + party.color;
            //Make the div's width relative to the number of votes they got
            areaElement.style.width = party.votes/max*(resultElement.offsetWidth - 150) +"px";

            resultElement.appendChild(partyElement);
        });
    });
}

//Comparer function for sorting by a specific key
function getSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return -1;    
        } else if (a[prop] < b[prop]) {    
            return 1;    
        }    
        return 0;    
    }    
}