
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
 
function submitIssue(e) {
  e.preventDefault();
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';
  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  
  if(description == ""){
    document.getElementById('description-alert').innerText = 'Please write the description';
  }
  else if(assignedTo == ""){
    document.getElementById('assign-alert').innerText = 'Please enter the responsible';
    document.getElementById('description-alert').innerText = "";
  }
  else{
    if (localStorage.getItem('issues')){
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    totalIssues();
    totalOpenIssue();
    fetchIssues();
    e.preventDefault();
    document.getElementById('assign-alert').innerText = "";
    document.getElementById('description-alert').innerText = "";
  }
}

const totalOpenIssue = () => {
  let openIssue = 0;
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  issues.forEach(element => {
  //  console.log(Element);
    if(element.status === "Open") {
      openIssue +=1;
    }
  
  });
  document.getElementById('totalOpenIssue').innerHTML = openIssue;
};
totalOpenIssue();



const totalIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  document.getElementById('total-issue').innerHTML = '(' + issues.length + ')';
};
totalIssues();

const  setStatusClosed = (event, id)=> {
  event.preventDefault();
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  console.log("currentIssue",currentIssue);
  currentIssue.status = 'Closed';
  currentIssue.description = currentIssue.description.strike();
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  totalOpenIssue();
};
const deleteIssue = (event, id) => {
  event.preventDefault();
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id );
  document.getElementById(`issue-card-${id}`).style.display = 'none';
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  totalIssues();
  totalOpenIssue();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  document.getElementById('issuesList').innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well" id="issue-card-${id}">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="issue-title-${id}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick=" setStatusClosed(event, ${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(event, ${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  
};