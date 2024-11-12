window.onload = function () {
    const select = document.createElement("select");
    select.id = "topicSelect";
    const contentDiv = document.createElement("div");
    contentDiv.id = "content";
  
    const disclaimer = document.querySelector(".disclaimer");
    disclaimer.after(select);
    select.after(contentDiv);
  
    // Fetch the text file
    fetch("text/reactans.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text();
      })
      .then((text) => {
        // Define escapeHtml function to sanitize the text
        function escapeHtml(unsafe) {
          return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        }
  
        contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
          text
        )}</code></pre>`;
        Prism.highlightAll();
  
        const topicsList = [
          "1)BMI",
          "2) That demonstrates constructor overloading  with three constructors:",
          "3)Checks if a given password is valid based on specific criteria.",
          "",
          "5)Ramu receiving gifts of different values from his parents.",
          "6) that calculates and sorts the perimeters of different shapes",
          "7)To create a university registration system that captures and displays the details of an undergraduate student",
          "8)that reads a sequence of integers and stores them in a list only if they form a strictly increasing sequence.",
          "9)That counts the number of unique words in a given sentence",
          "10)the use of synchronized methods for thread-safe incrementing of a counter"
          
        ];
  
        const sections = text.split("END");
  
        select.innerHTML = "";
  
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a Topic";
        select.appendChild(defaultOption);
  
        topicsList.forEach((topic, index) => {
          const option = document.createElement("option");
          option.value = index;
          option.textContent = topic;
          select.appendChild(option);
        });
  
        select.addEventListener("change", function () {
          if (this.value === "") {
            contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
              text
            )}</code></pre>`;
          } else {
            const selectedContent = sections[this.value].trim();
            contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
              selectedContent
            )}</code></pre>`;
          }
          Prism.highlightAll();
        });
      })
      .catch((error) => {
        console.error("Error loading file:", error);
        contentDiv.innerHTML =
          '<p style="color: red;">Error loading content. Please refresh the page.</p>';
      });
  };