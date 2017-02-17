var xhr = new XMLHttpRequest();
xhr.open('GET', 'phones.json', true);

xhr.send();

xhr.onreadystatechange = function() {
  
  if (xhr.readyState !== 4) {
    return;
  }

  if (xhr.status !== 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    var tele = JSON.parse(xhr.responseText);

    var list = document.createElement("ul");
    document.body.appendChild(list);
    for(i = 0; i < tele.length; i++) {
      var listChild = document.createElement("li");
      listChild.innerText = tele[i];
      list.appendChild(listChild);
    }
  }

};
