// Function to show a toaster message
function showToaster(message) {
    const toaster = document.getElementById('toaster');
    toaster.innerText = message;
    toaster.classList.add('show');
    setTimeout(() => {
      toaster.classList.remove('show');
    }, 3000);
  }
  
  // Handle decoding
  document.getElementById('decode').addEventListener('click', () => {
    const input = document.getElementById('input').value;
    try {
      const indent = '  '; // indent for formatting js object
      const base64Pairs = input
        // split the string into an array of separate lines
        .split(/\n/gm)
        // map through each and extract key:value for each array item
        .map(line => line.replace(/^(.*?=+)(.*?)=*:\s(.*?=+)(.*?)=*$/, '$2:$4'));

      // Set up json object string
      let queryObject = '{\n';

      // Iterate through each line and decode before and after the colon
      base64Pairs.forEach((pair, i) => {
        const [key, value] = pair.split(':');
        queryObject += `${indent}"${atob(key)}" : "${value === 'null' ? 'null' : atob(value)}${i === base64Pairs.length - 1 ? '"' : '",'}\n`;
      });
      queryObject += '}';
      
      // Update the output element
      document.getElementById('output').innerText = queryObject;
      showToaster('String decoded successfully!');
    } catch (error) {
      console.log(error.message);
      document.getElementById('output').innerText = 'Error: Invalid input for decoding.';
      showToaster('Error: Invalid input for decoding.');
    }
  });
  
  // Handle copy to clipboard
  document.getElementById('copy').addEventListener('click', () => {
    const output = document.getElementById('output').innerText;
    if (output) {
      navigator.clipboard.writeText(output)
        .then(() => {
          showToaster('Copied to clipboard!');
        })
        .catch(err => {
          showToaster('Failed to copy to clipboard.');
        });
    } else {
      showToaster('Nothing to copy!');
    }
  });


  /*
MTE=c2l0ZV9xdWVyeQ==: NDY=null
Mjg=YXNzaWdubWVudF9xdWVyeQ==: NDU=OTQ3MzM=
MzA=bW9kdWxlX3F1ZXJ5: OTE=MTA4NTMx
NQ==bWFzdGVyX3F1ZXJ5: NDM=MTQ1ODg=
NTY=b2Zmc2V0: ODg=MA==
NTY=c2NvbV9xdWVyeQ==: MjE=null
ODA=Z2NvbV9xdWVyeQ==: NjA=NTA1MDc=
ODU=dGVybV9xdWVyeQ==: ODE=MjAyNDAw
OTI=bWF4: OTU=MTAwMA==
  */