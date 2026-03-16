/*
Initially developed at Codepen homepage with only room for one file of each type (html, css, js). This file contains all JavaScript code for the website.
*/

// Hämta elementreferenser 

const sidebar = document.getElementById("sidebar"); 

const menuToggle = document.getElementById("menuToggle"); 

// Make sidebar toggle for mobile 

menuToggle.addEventListener("click", () => { 

    sidebar.classList.toggle("active"); 

}); 

//Lägg till ljud globalt 

let beepAudio = new Audio("https://www.soundjay.com/buttons_c2026/sounds/button-8.mp3"); 

// ----- KOLLA UPP! ----- 

/* Ska vi ha Web Notifications 

istället för alert? Borde gå att 

använda CSS för det.
Eller mer robust med att utveckla en egen lösning
 */  

// Funktion för att visa ett meddelande med ljud  

function showMessage(message) {  

  // Stoppa om redan finns 

  if (document.getElementById("customOverlay")) return; 

  // Skapa overlay 

  const overlay = document.createElement("div"); 

  overlay.id = "customOverlay"; 

  overlay.style.position = "fixed"; 

  overlay.style.top = "0"; 

  overlay.style.left = "0"; 

  overlay.style.width = "100%"; 

  overlay.style.height = "100%"; 

  overlay.style.backgroundColor = "rgba(0,0,0,0.4)"; 

  overlay.style.opacity = "0"; 

  overlay.style.transition = "opacity 0.3s ease"; 

  overlay.style.zIndex = "999"; 

  document.body.appendChild(overlay);
 

  // Skapa meddelanderuta 

  const alertDiv = document.createElement("div"); 

  alertDiv.style.position = "fixed"; 

  alertDiv.style.top = "50%"; 

  alertDiv.style.left = "50%"; 

  alertDiv.style.transform = "translate(-50%, -50%)"; 

  alertDiv.style.backgroundColor = "red"; 

  alertDiv.style.border = "3px solid #000"; 

  alertDiv.style.borderRadius = "10px"; 

  alertDiv.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)"; 

  alertDiv.style.padding = "30px 40px"; 

  alertDiv.style.zIndex = "1000"; 

  alertDiv.style.textAlign = "center"; 

  alertDiv.style.fontFamily = "'Play', sans-serif"; 

  alertDiv.style.fontSize = "1.3rem"; 

  alertDiv.style.color = "#2c3e50"; 

  alertDiv.style.maxWidth = "1000px"; 

  alertDiv.textContent = message;  

  document.body.appendChild(alertDiv);  

  // Fade in 

  requestAnimationFrame(() => { 

    overlay.style.opacity = "1"; 

  }); 
 

  // OK-knapp 

  const okBtn = document.createElement("button"); 

  okBtn.textContent = "OK"; 

  okBtn.style.marginTop = "20px"; 

  okBtn.style.padding = "10px 20px"; 

  okBtn.style.cursor = "pointer"; 

  okBtn.style.backgroundColor = "orange"; 

  okBtn.style.color = "#2c3e50"; 

  okBtn.style.border = "none"; 

  okBtn.style.borderRadius = "5px";  

  okBtn.addEventListener("click", () => { 

    overlay.style.opacity = "0"; 

    alertDiv.style.opacity = "0"; 

    setTimeout(() => { 

      overlay.remove(); 

      alertDiv.remove(); 

    }, 300); 

  }); 

  alertDiv.appendChild(document.createElement("br"));
  alertDiv.appendChild(okBtn);
}
 

let reminders = []; // Array för flera påminnelser 

function checkReminders() { 

    const now = new Date();  

    reminders.forEach((r) => { 

        if (!r.triggered && now >= r.date) { 

          // Spela ljud 

            beepAudio.currentTime = 0; 

            beepAudio.play().catch(e => console.log("Ljud kunde inte spelas:", e)); 

            showMessage(r.message); 

            r.triggered = true; 

            updateReminderList(); 

        } 
    }); 
} 
 

function addReminder() { 

    const dateInput = document.getElementById("reminderDate").value; 

    const timeInput = document.getElementById("reminderTime").value; 

    const message = document.getElementById("reminderMessage").value || "Dags för din påminnelse!";  

    if (!dateInput || !timeInput) { 

        showMessage("Vänligen välj både datum och tid."); 

        return; 

    }  

    const reminderDate = new Date(dateInput + "T" + timeInput);  

    reminders.push({ date: reminderDate, message, triggered: false }); 

  //Sortering så tillagda tider/meddelanden dyker upp 

  // i kronologisk ordning 

    reminders.sort((a, b) => a.date - b.date);  

    updateReminderList(); 

  // Nollställ inputfält efter varje tillagd tid/meddelande 

document.getElementById("reminderDate").value = ""; 

document.getElementById("reminderTime").value = ""; 

document.getElementById("reminderMessage").value = ""; 

}  

function clearAllReminders() { 

    reminders = []; 

    updateReminderList(); 

}
 

function updateReminderList() { 

    const upcomingList = document.getElementById("reminderList"); 

    const completedList = document.getElementById("completedReminderList"); 

    if (!upcomingList || !completedList) return;
 

    upcomingList.innerHTML = ""; 

    completedList.innerHTML = ""; 
 

    const upcoming = reminders.filter(r => !r.triggered); 

    const completed = reminders.filter(r => r.triggered);  

    // Kommande 

    if (upcoming.length === 0) { 

        upcomingList.innerHTML = "<li>Du har för närvarande inga kommande påminnelser.</li>"; 

    } else { 

        upcoming.forEach((r) => { 

            const li = document.createElement("li"); 

            const dateStr = r.date.toLocaleDateString(); 

            const timeStr = r.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 

            li.textContent = `${dateStr} ${timeStr} - ${r.message}`; 

            upcomingList.appendChild(li); 

        }); 
    } 
 

    // Genomförda 

    if (completed.length === 0) { 

        completedList.innerHTML = "<li>Inga genomförda påminnelser ännu.</li>"; 

    } else { 

        completed.forEach((r) => { 

            const li = document.createElement("li"); 

            const dateStr = r.date.toLocaleDateString(); 

            const timeStr = r.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 

            li.textContent = `${dateStr} ${timeStr} - ${r.message}`; 

            completedList.appendChild(li); 

        }); 
    } 
}
 

// Kör check varje sekund 

setInterval(checkReminders, 1000); // 1000 ms = 1 sekund 
 

// EXPLORE-INNEHÅLL 

const letterSets = { 

  green: ["A", "S", "T"], 

  yellow: ["B", "L", "M", "N", "R"], 

  blue: ["F", "K", "P", "Å", "Ä", "Ö"], 

  red: ["Q", "W", "Z", "X", "C"] 

}; 
 

const levelColors = { 

  green: "#2e7d32", 

  yellow: "#f9a825", 

  blue: "#1565c0", 

  red: "#c62828" 

};
 

function getRandomLetter(level) { 

  const set = letterSets[level]; 

  return set[Math.floor(Math.random() * set.length)]; 

} 
 

//TIMER 

let currentTimer; 

document.addEventListener("click", function (e) { 

  if (e.target.matches("#difficultyMenu button")) { 

    const level = e.target.dataset.level; 

    const letter = getRandomLetter(level);  

    // Active-hantering 

    document.querySelectorAll("#difficultyMenu button").forEach(btn => btn.classList.remove("active")); 

    e.target.classList.add("active"); 

    // Visa bokstav + instruktion 

    const letterDisplay = document.getElementById("letterDisplay"); 

    letterDisplay.innerHTML = `<br>Bokstav: <strong>${letter}</strong> — Hitta 5 saker på 5 minuter!<br>`; 

    letterDisplay.style.color = levelColors[level]; 

    // Starta timer ENBART när knapp klickas 

    startTimer(5);  

    // Ladda ljudet redan här (brukar "unlock" ljudet) 

    beepAudio.play().then(() =>                             beepAudio.pause()).catch(() => {}); 
    beepAudio.currentTime = 0; // nollställ 

  } 

  // Stoppa timer-knappen 

if (e.target.matches("#stopTimerBtn")) { 

  if (currentTimer) { 

    clearInterval(currentTimer); 

    currentTimer = null; 

    document.getElementById("timerDisplay").innerHTML = "Tid stoppad."; 
  } 
}
}); 
 

function startTimer(durationMinutes) { 

  const timerDisplay = document.getElementById("timerDisplay");
 

  // Stoppa tidigare timer 

  if (currentTimer) clearInterval(currentTimer); 

  let time = durationMinutes * 60;
 

  currentTimer = setInterval(() => { 

    const minutes = Math.floor(time / 60); 

    const seconds = time % 60; 

    timerDisplay.textContent = `Tid kvar: ${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;  

    if (time === 0) { 

      clearInterval(currentTimer); 

      // Spela ljud 

  beepAudio.currentTime = 0; 

  beepAudio.play().catch(e => console.log("Ljud kunde inte spelas:", e)); 

      showMessage("Tiden är slut! Hoppas du hittade 5 saker!"); 

    }  

    time--; 

  }, 1000); 

} 
 

// Variabler för sektionernas innehåll 

const contentFlow = ` 

<h3>Arm Pulses</h3> 

<p>Denna övning sätter dina triceps i arbete och sträcker ut dina skuldror. 

Stå upp rakt med dina armar vid sidorna och handflatorna bakåt. 

Håll armarna raka medan du höjer och sänker dem bakom dig så långt du kan i 20 sekunder.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/vEoqwI1Lavw" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br> 

<!-- Bild --> 

<img src="https://www.shutterstock.com/image-vector/arm-pulses-exercise-woman-workout-260nw-2108204060.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Arm Circles</h3> 

<p>Stå upp rakt med fötterna utspridda i axelbredd. Håll armarna utsträckta åt sidorna 

och gör cirkelrörelser med raklånga armar i en riktning 20 gånger, byt sedan riktning.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/140RTNMciH8" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://www.shutterstock.com/image-vector/woman-doing-arm-circles-exercise-260nw-2050988921.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Wall Push-Ups</h3> 

<p>Stå en armlängds avstånd från en vägg och placera händerna på väggen medan du 

står i en lutning med kroppen. Håll kroppen rak medan du lutar dig framåt mot väggen 

och sedan trycker dig tillbaka. Gör 10–20 repetitioner.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Chair Squats</h3> 

<p>Stå upp med en stol precis bakom dig. Sitt ner men stanna precis innan du når stolen. 

Stå sedan upp raklång igen. Lägg all vikt på hälarna. Repetera 10 gånger.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Standing Rear Pulses</h3> 

<p>Håll i ett bord eller skrivbord medan du står raklång. Böj ett ben bakom dig 

i knäläge, lyft upp hälen och sänk den tre gånger, tryck sedan ut benet en gång. 

Repetera 10–20 gånger per ben.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Calf Raises</h3> 

<p>Stå bakom en stol med händerna på stolsryggen. Höj upp hälarna tills du står på tårna och sänk sakta. 

Repetera 10 gånger, gör om 3 set för optimal effekt.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Seated Bicycle Crunches</h3> 

<p>Sitt i en stol med fötterna mot golvet och händerna bakom huvudet. 

Lyft höger knä mot vänster armbåge, sänk tillbaka och repetera. Gör 10–15 per sida.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Oblique Twists</h3> 

<p>Sitt i en snurrande stol med fötterna upplyfta och händer på skrivbordet. 

Använd magen för att vrida kroppen från sida till sida 20 gånger.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h4>Stretch‑övningar</h4>  

<h3>Triceps Stretch</h3> 

<p>Ta höger hand och placera den på vänster skuldra bakom huvudet. 

Använd vänster hand för att hålla armbågen och ta tre djupa andetag. Byt sida.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Neck Rolls</h3> 

<p>Sitt raklång och luta huvudet framåt. Rulla sakta huvudet i en cirkel i 10 sekunder i varje riktning, 

upprepa tre gånger.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Shoulder Stretch</h3> 

<p>Sitt med händerna flätade ovanför huvudet, handflator uppåt. 

Sträck uppåt och håll tre djupa andetag. Upprepa tre gånger.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr> 

<h3>Shoulder Rolls</h3> 

<p>Sitt och tryck axlarna uppåt, rulla dem sakta bakåt i 20 sekunder.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Chest Stretch</h3> 

<p>Sitt med händerna bakom ryggen, tryck ut bröstet och håll tre djupa andetag.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Torso Twist</h3> 

<p>Sitt med fötterna på golvet, vänster hand på högersidan av stolen, höger hand på låret. 

Rotera kroppen till höger och håll tre djupa andetag, byt sedan sida.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h3>Wrists and Fingers Stretch</h3> 

<p>Stå upp med händerna på ett bord, handflator nedåt och fingrar utsträckta medan du lutar dig framåt. 

Håll positionen tills spänningen släpper.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr>  

<h4>Övningar med hjälpmedel</h4>  

<h3>Kropp och axel balans</h3> 

<p>Stå raklång med armen utsträckt i axelhöjd med hjälpmedel i handen. 

Gör fem cirkelrörelser och byt arm. Vill du ha mer utmaning, testa stå på ett ben.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr> 

<h3>Tray Curls</h3> 

<p>Sitt raklång med ett objekt på handflatan, armbågen låst vid sidan. 

Lyft handen mot axeln och sänk sakta. Repetera 20 gånger per arm.</p> 

<br> 

<!-- YouTube‑video --> 

<iframe width="560" height="315" 

    src="https://www.youtube.com/embed/VIDEO_ID1" 

    frameborder="0" 

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

    allowfullscreen> 

</iframe> 

<br>  

<!-- Bild --> 

<img src="https://example.com/armpulses.jpg" alt="Arm Pulses bild" style="max-width:100%; margin-top:10px;"> 

<br> 

<hr> 

<br> 

<br> 

<br> 

`; 

const contentFocus = `<h3>Hur reflekterar man och lär sig från det? Här är ett exempel för lättare förståelse över detta tankesätt.</h3>

<br>
 
  </p> 

<br> 

<p> 

<p><strong>1. Rapportera:</strong><br>
Under vårt projektmöte i förmiddags delegerade min projektledare tre nya brådskande uppgifter till mig, trots att min nuvarande arbetslista redan är fulltecknad. Jag tackade ja utan att nämna min tidsbrist.

  </p> 

<br> 

<p> 

<p><strong>2. Svara:</strong><br> 
Jag kände en omedelbar stressklump i magen och en växande irritation mot projektledaren för att hen inte har koll på min arbetsbelastning. Samtidigt kände jag mig svag som inte sa nej direkt, vilket gjorde mig okoncentrerad under resten av dagen.

  </p> 

<br> 

<p> 

<p><strong>3. Relatera:</strong><br> 
Detta är ett återkommande mönster för mig, jag har svårt att sätta gränser eftersom jag vill framstå som kompetent och hjälpsam. Det påminner om min förra roll där jag till slut blev utbränd för att jag aldrig flaggade i tid.

  </p> 

<br> 

<p> 

<p><strong>4. Resonera:</strong><br> 
Analyserar jag situationen ser jag att problemet är bristande kommunikation snarare än illvilja. Jag måste använda assertiv kommunikation då det är mitt ansvar att informera om mina begränsningar för att teamet ska fungera effektivt. Om jag inte säger ifrån riskerar kvaliteten på allt mitt arbete att sjunka.

  </p> 

<br> 

<p>

<p><strong>5. Rekonstruera:</strong><br> 
I framtiden ska jag använda strategin "pausa svaret". Istället för att säga ja direkt ska jag säga: "Jag kollar min prioriteringslista och återkommer om 10 minuter med vad som behöver flyttas på för att jag ska hinna detta". Imorgon bitti ska jag boka ett kort avstämning med projektledaren för att prioritera om veckans uppgifter.

  </p>
  <br>

<!-- Bild --> 

<img src="https://productivitysteps.wordpress.com/wp-content/uploads/2015/12/take-time-to-reflect.jpg" alt="Reflektion bild" style="max-width:25%; display:block; margin: 10px auto;"> 

<br> 

<hr> 

`;
 

const contentShare = `<h3>Här finns övningar och initiativ för socialt interagerande.</h3>

</p>

<br> 

<h3>🎲 Spela tillsammans</h3> 

<br> 

  <p> 

    <a href="https://lichess.org" target="_blank"> 

      ♟ Spela schack tillsammans (Lichess) 

    </a> 

  </p> 

<br> 

<p> 

    <a href="https://https://kahoot.it/" target="_blank"> 

      🧠 Interaktivt quiz spel (10 spelare) 

    </a> 

  <p> 

  <br>

    <a href="https://papergames.io/en/battleship" target="_blank"> 

      🚢 Sänka skepp (2 spelare) 

    </a> 

  </p> 

<br> 

  <p> 

    <a href="https://papergames.io/en/connect4" target="_blank"> 

      🔴 Fyra i rad 

    </a> 

  </p> 

<br> 

  <p> 

    <a href="https://www.playok.com/sv/" target="_blank"> 

      🎯 Fler klassiska spel 

    </a> 

  </p> 

<br> 

  <hr>  

  <h3>🤝 Snabba sociala övningar</h3> 

<br> 

  <p><strong>2-minutersfråga:</strong><br> 

  "Vad är något litet som gjorde dig glad den här veckan?" 

  </p> 

  <p><strong>Mini-utmaning:</strong><br> 

  Ge en kollega en genuin komplimang idag. 

  </p> 

  <p><strong>Samarbetsövning:</strong><br> 

  Bygg en idé tillsammans på 5 minuter – inga invändningar tillåtna. 

  </p> 

<hr> 

`; 
 

const contentExplore = ` 

<section id="explore"> 

  <h3>Utforskande mikroutmaningar</h3> 

  <br> 

  <p>Välj nivå och hitta 5 saker på din arbetsplats på 5 minuter.</p> 

  <br> 

  <nav id="difficultyMenu"> 

    <button data-level="green">Easy</button> 

    <button data-level="yellow">Medium</button> 

    <button data-level="blue">Hard</button> 

    <button data-level="red">Extreme</button> 

  </nav> 

<br> 

  <output id="exploreResult" aria-live="polite"> 

  <span id="letterDisplay"></span> 

  <br> 

  <span id="timerDisplay"></span> 

</output> 

<button id="stopTimerBtn">Stoppa tid</button>  

</section> 

`; 

const contentReminder = ` 

<h3>Ställ in påminnelse</h3> 

<p>Välj datum, tid och skriv ett meddelande för påminnelsen:</p>  

<input type="date" id="reminderDate" class="reminder-input"> 

<input type="time" id="reminderTime" class="reminder-input"> 

<input type="text" id="reminderMessage" placeholder="Skriv meddelande här" class="reminder-input"> 

<br><br> 

<button onclick="addReminder()" class="reminder-btn">Lägg till</button> 

<button onclick="clearAllReminders()" class="reminder-btn">Rensa alla</button>  

<h4>Kommande påminnelser:</h4> 

<ul id="reminderList"></ul> 

<h4>Genomförda påminnelser:</h4> 

<ul id="completedReminderList"></ul> 

`;  

// Funktion som uppdaterar sidan baserat på knapp 

function showSection(name) { 

    const sectionTitle = document.getElementById("sectionTitle"); 

    const sectionText = document.getElementById("sectionText"); 
 

    switch (name) { 

        case "Focus": 

            sectionTitle.textContent = "Focus – Reflektionsövningar"; 

            sectionText.innerHTML = contentFocus; 

            break;  

        case "Flow": 

            sectionTitle.textContent = "Flow – Fysiska Övningar"; 

            sectionText.innerHTML = contentFlow; 

            break; 

        case "Share": 

            sectionTitle.textContent = "Share – Social Interaktion"; 

            sectionText.innerHTML = contentShare; 

            break; 

        case "Explore": 

            sectionTitle.textContent = "Explore – Utforskande Övningar"; 

            sectionText.innerHTML = contentExplore; 

            break;         

        case "Reminder": 

    sectionTitle.textContent = "Reminder"; 

    sectionText.innerHTML = contentReminder;
 

    // Vänta tills DOM är uppdaterad 

    requestAnimationFrame(updateReminderList); 

    break;         

      case "Kontakt": 

    sectionTitle.textContent = "Kontakta oss"; 

    sectionText.innerHTML = ` 

        <strong>E-post:</strong> info@everyday.se<br><br> 

        <strong>Telefon:</strong> 070-123 45 67<br><br> 

        <strong>Adress:</strong> Exempelgatan 12, 123 45 Stockholm<br><br> 

        <iframe 

  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2073.1234567890123!2d15.619500!3d56.166200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46521789abcdef01%3A0xabcdef1234567890!2s%C3%96sterleden%203%2C%20371%2034%20Karlskrona%2C%20Sweden!5e0!3m2!1ssv!2sse!4v1700000000000!5m2!1ssv!2sse" 

  width="50%" 

  height="500" 

  style="border:0;" 

  allowfullscreen="" 

  loading="lazy" 

  referrerpolicy="no-referrer-when-downgrade"> 

</iframe>

    `; 

    break; 

        default: 

            sectionTitle.textContent = "Välkommen!"; 

            sectionText.innerHTML = ` 

                <h3>Denna hemsida har Paus-it övningar.</h3> 

                <ul> 

                    <li><strong>Focus:</strong> Reflektionsövningar som du kan göra i kontorsmiljö.</li> 

                    <li><strong>Flow:</strong> Fysiska övningar med instruktioner, bilder och videor.</li> 

                    <li><strong>Share:</strong> Övningar och aktiviteter för social interaktion.</li> 

                    <li><strong>Explore:</strong> Utforskande övningar för variation under dagen.</li> 

                    <li><strong>Reminder:</strong> Lägg in påminnelser för övningar, möten eller pauser.</li> 

                    <br> 

                    <p>Klicka på knapparna i sidomenyn för att komma igång!</p> 

                    <hr> 

                    <br> 

                    <li><strong>Kontakt:</strong> Kontaktinformation och adress till Iris Kraft.</li> 

                </ul>
            `; 

        break; 

    }

    // Stäng sidomenyn på mobil 

    sidebar.classList.remove("active"); 

}  

document.addEventListener("DOMContentLoaded", function () { 
    showSection("Home");
});
