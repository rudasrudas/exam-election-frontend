window.onload = () => {
    findCandidates(null);
    initFilter();
}

function initFilter(){
    const filterElement = document.querySelector(".party-filter");
    const allPartiesElement = filterElement.querySelector(".party.default");

    fetch("https://electionx-backend.herokuapp.com/parties")
    .then(response => response.json())
    .then(parties => {
        parties.forEach(party => {
            //Create HTML element
            const partyElement = document.createElement("div");
            partyElement.classList.add("party", "pointer");
            partyElement.innerHTML = "<div class='initial'>" + party.initial + "</div>" + party.title;
            partyElement.querySelector(".initial").style.backgroundColor = "#" + party.color;
            partyElement.addEventListener("click", () => {
                selectParty(partyElement);
                findCandidates(party.id);
            });

            filterElement.appendChild(partyElement);
        })
    });

    //Add all parties option
    allPartiesElement.addEventListener("click", () => {
        selectParty(allPartiesElement);
        findCandidates(null);
    });
}

function selectParty(partyElement){
    // Unselect all filters
    const partyElements = document.querySelectorAll(".party-filter > .party");
    partyElements.forEach(party => party.classList.remove("selected"));    
    // Select this filter
    partyElement.classList.add("selected");
}

function findCandidates(partyId){
    const candidateWrapperElement = document.querySelector(".candidate-list");

    
    let url = "https://electionx-backend.herokuapp.com/candidates"
    if(partyId != null)
        url += "/party/" + partyId;

    fetch(url)
    .then(response => response.json())
    .then(candidates => {
        // Remove all candidate elements
        while(candidateWrapperElement.children.length > 0)
            candidateWrapperElement.removeChild(candidateWrapperElement.firstChild);

        // Create new elements
        candidates.forEach(candidate => {
            const candidateElement = document.createElement("div");
            candidateElement.classList.add("candidate");
            candidateElement.innerHTML = "<div class='visual'><img src='https://thispersondoesnotexist.com/image'><p class='initial'>" + candidate.party.initial + "</p></div>" + 
                                        "<p class='name'>" + candidate.name + " " + candidate.surname + "</p>" +
                                        "<div><p class='party-header'>Party</p><p class='party-title'>" + candidate.party.title + "</p></div>";
            candidateElement.querySelector(".initial").style.background = "#" + candidate.party.color;
            candidateElement.querySelector("img").src = "https://picsum.photos/seed/" + candidate.id + candidate.surname + candidate.name + "/300/300";
            candidateWrapperElement.appendChild(candidateElement);

            // fetch("https://this-person-does-not-exist.com/en?new")
            // .then(response => response.json())
            // .then(face => {
            //     candidateElement.querySelector("img").src = "https://this-person-does-not-exist.com/" + face.name;
            // })
        });
    });
}