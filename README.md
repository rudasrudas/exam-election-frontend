# exam-election-frontend
24 hour exam project at KEA, 3rd semester Computer Science AP degree. Backend rest api for an election software at a single municipality in Denmark.

2021/12/20

Hosted on Github pages at https://rudasrudas.github.io/exam-election-frontend

## Features
The webpage features 3 main pages - Candidates, Editor and Results. Their functionalities are listed below.


**Candidates page**

This webpage is used to get an overview of all the candidates partaking in the election. The user can choose whether they want to see all the candidates, or filter by a specific party. Every party and candidate is loaded dynamically. The colors are associated with the parties, and each candidate has a random image assigned, which represents them, that's taken from a public API.


**Editor page**

This webpage is intended for website administrator and election manager to use. They are able to add a new candidate, update existing candidate's name, surname and their party, or just remove the candidate from the election.
I have not implemented any security in the page, because in terms of frontend, apart from setting and getting keys from the local or session storage, it is practically the same as creating/editing candidate info and wouldn't showcase any additional skillsets.


**Results page**

This is an example of what the results page could look like once the elections are done and all the votes are counted. Each party stores a number of votes that they got, and every party and their votes, color & letter-initial is loaded dynamically.


##
Created by Justas Zdanavicius (just1531@stud.kea.dk), 20/12/2021
