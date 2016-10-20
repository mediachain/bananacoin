var accounts, beat;

function registerSong() {
    var from = document.getElementById('accounts').value;
    var song = document.getElementById('regId').value;
    var price = document.getElementById('regPrice').value;
    var artist = document.getElementById('registerName').value;
    //var beat = BeatCoin.deployed();
    beat.registerSong.call(song, price, accounts[artist], {from: accounts[from]}).then(function () {
      console.log('Song Registered!');
    })
    .catch(e => {
      console.log(e);
    });
    updateBalances();
};

function purchaseSong() {
    var from = document.getElementById('accounts').value;
    var song = document.getElementById('purId').value;
    var price = document.getElementById('purPrice').value;
    var artist = document.getElementById('purchaseName').value;
    beat.purchaseSong.call(song, price, accounts[artist], {from: accounts[from]}).then(function () {
      console.log('Song Purchased!');
    })
    .catch(e => {
      console.log(e);
    });
    updateBalances();
};

function addBalance(index) {
  beat.createTokens.sendTransaction(web3.eth.accounts[index],{from: web3.eth.coinbase, value:1});
  beat.balanceOf.call(accounts[index]).then(bal => {
    console.log("Added to balance");
  });
  updateBalances();
}

function updateBalances() {
  for(var i=0; i < accounts.length; i++) {
    (i => {
      beat.balanceOf.call(accounts[i]).then(bal => {
        document.getElementById(i+'bal').innerHTML = bal + ' BEA';
        console.log('Updated balance ' + i);
      });
    })(i);
  }
  beat.totalSupply.call().then(val => {
    document.getElementById('supply').innerHTML = val;
  })
}

window.onload = function() {
  beat = BeatCoin.deployed();
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    var fromAccounts = document.getElementById('accounts');
    var regAccounts = document.getElementById('registerName');
    var purAccounts = document.getElementById('purchaseName');

    var addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.class = 'addButton';
    addButton.value = "+";


    for(var i=0; i < accounts.length; i++) {
      //Add options to address select elements
      var opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = i + ": " + accounts[i];
      fromAccounts.appendChild(opt);
      regAccounts.appendChild(opt.cloneNode(true));
      purAccounts.appendChild(opt.cloneNode(true));

      //Add cell to balances table
      var balTable = document.getElementById('balances');
      var cell = document.createElement('tr').cloneNode(true);
      cell.innerHTML = '<td id='+i+'>'+accounts[i]+'</td>'
                      +'<td id='+i+'bal>0 BEA</td>'
                      +'<td><input type="button" value="+" onclick="addBalance('+i+')" /></td>';
      balTable.appendChild(cell);
    }

    updateBalances();
  });
};
