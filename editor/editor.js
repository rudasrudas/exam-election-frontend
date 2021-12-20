let candidateDataOverlayElement;
let candidateDataButton;
let candidateName;
let candidateSurname;
let candidateParty;
let overlayArrowElement;

window.onload = () => {
    initOverlay();
    initCandidates();
}

function initOverlay(){
    candidateDataOverlayElement = document.querySelector(".candidate-data");
    candidateDataButton = candidateDataOverlayElement.querySelector("button");
    candidateName = candidateDataOverlayElement.querySelector(".name");
    candidateSurname = candidateDataOverlayElement.querySelector(".surname");
    overlayArrowElement = candidateDataOverlayElement.querySelector("span.material-icons");
    const newCandidateButton = document.querySelector(".add-new");

    //Arrow to go back
    overlayArrowElement.addEventListener("click", () => {
        candidateDataOverlayElement.classList.add("hidden");
    });
    
    //New candidate button
    newCandidateButton.addEventListener("click", () => {
        //Reset data in the inputs
        resetPartyOptions(null);
        candidateName.value = "";
        candidateSurname.value = "";
        candidateDataButton.removeEventListener("click", updateCandidate);
        candidateDataButton.addEventListener("click", addCandidate);
        revealOverlay();
    })
}

function initCandidates(){
    const tableElement = document.querySelector("table.candidate-list > tbody");

    fetch("https://electionx-backend.herokuapp.com/candidates")
    .then(response => response.json())
    .then(candidates => {
        removeAllRows();
        // Create new elements
        candidates.forEach(candidate => {
            const candidateElement = document.createElement("tr");
            candidateElement.innerHTML = "<th>" + candidate.name + " " + candidate.surname + "</th>" + 
                                         "<th class='party'><div class='initial'>" + candidate.party.initial + "</div> " + candidate.party.title + "</th>" + 
                                         "<th><button class='edit'>Edit</button></th>" +
                                         "<th><button class='remove'>Remove</button></th>";

            candidateElement.querySelector(".initial").style.background = "#" + candidate.party.color;

            //EDIT
            candidateElement.querySelector(".edit").addEventListener("click", () => {
                //Set current values to the editing overlay
                resetPartyOptions(candidate.party.id);
                candidateDataOverlayElement.dataset.id = candidate.id;
                candidateName.value = candidate.name;
                candidateSurname.value = candidate.surname;

                candidateDataButton.removeEventListener("click", addCandidate);
                candidateDataButton.addEventListener("click", updateCandidate);
                revealOverlay();
            });

            //REMOVE    
            candidateElement.querySelector(".remove").addEventListener("click", () => {
                fetch("https://electionx-backend.herokuapp.com/candidates/" + candidate.id, 
                {
                    method: "DELETE"
                })
                .then(response => response.text())
                .then(() => {
                    tableElement.removeChild(candidateElement);
                });
            });
            tableElement.appendChild(candidateElement);
        });
    });
}

function resetPartyOptions(setTo) {
    
    candidateParty = candidateDataOverlayElement.querySelector(".party");
    while(candidateParty.children.length) candidateParty.removeChild(candidateParty.firstChild);

    const partyElement = document.createElement("option");
    partyElement.innerHTML = "Select a party...";
    candidateParty.appendChild(partyElement);

    fetch("https://electionx-backend.herokuapp.com/parties")
    .then(response => response.json())
    .then(parties => {
        parties.forEach(party => {
            //Create HTML element
            const partyElement = document.createElement("option");
            partyElement.innerHTML = party.title + " (" + party.initial + ")";
            partyElement.value = party.id;
            if(setTo == party.id){
                partyElement.selected = "true";
            }
            candidateParty.appendChild(partyElement);
        })
    });
}

function updateCandidate() {
    candidateDataOverlayElement.classList.add("hidden");

    const candidateData = {
        id: candidateDataOverlayElement.dataset.id,
        name: candidateName.value,
        surname: candidateSurname.value,
        party: candidateParty.value
    }
    
    if(candidateData.id != null && candidateData.name != "" && candidateData.surname != "" && candidateData.party != null){
        fetch("https://electionx-backend.herokuapp.com/candidates", 
        {
            method: "PUT",
            body: JSON.stringify(candidateData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(() => {
            initCandidates();
        });
    }
}

function addCandidate() {
    candidateDataOverlayElement.classList.add("hidden");

    const candidateData = {
        id: "",
        name: candidateName.value,
        surname: candidateSurname.value,
        party: candidateParty.value
    }
    
    if(candidateData.name != "" && candidateData.surname != "" && candidateData.party != null){
        fetch("https://electionx-backend.herokuapp.com/candidates", 
        {
            method: 'POST',
            body: JSON.stringify(candidateData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(() => {
            initCandidates();
        });
    }
}

function removeAllRows() {
    const table = document.querySelector("table.candidate-list > tbody");
    while(table.children.length) table.removeChild(table.firstChild);
}

function revealOverlay() {
    candidateDataOverlayElement.classList.remove("hidden")
}