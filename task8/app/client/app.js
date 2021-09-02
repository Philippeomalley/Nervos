
App = {
	loading: false,
	contracts: {},

	load: async () => {
		await App.loadWeb3()
		await App.loadAccount()
		await App.loadContracts()
		await App.renderAdresses()
		await App.render()


	},

	loadWeb3: async () => {

		if (web3) {
			const godwokenRpcUrl = "https://godwoken-testnet-web3-rpc.ckbapp.dev"
			const providerConfig = {
				rollupTypeHash: "0x4cc2e6526204ae6a2e8fcf12f7ad472f41a1606d5b9624beebd215d780809f6a",
				ethAccountLockCodeHash: "0xdeec13a7b8e100579541384ccaf4b5223733e4a5483c3aec95ddc4c1d5ea5b22",
				web3Url: godwokenRpcUrl
			};
			App.web3Provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig);

			web3 = new Web3(App.web3Provider);

		} else {
			console.log("No ethereum browser is installed. Try installing MetaMask");
		}
	},

	loadAccount: async () => {

		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});

		App.account = accounts[0];

	},
	//hello

	//load Contract
	loadContracts: async () => {
		try {

			const contractAddress = "0x4842bD0Cae49d85e6a991b0DF2d914907def2144"
			const ERC20proxyAddress = "0x3A997643D013a70AFf8f9A3757c45D69d0dd4575"

			const res = await fetch("TodoList.json");
			const ERC20_res = await fetch("ERC20.json");

			const TodoListJSON = await res.json();
			const ERC20JSON = await ERC20_res.json();

			if (contractAddress) {
				console.log("Using deployed contract")
				App.TodoList = new web3.eth.Contract(TodoListJSON.abi, contractAddress);
			}

			if (ERC20proxyAddress) {
				console.log("Using ERC contract")
				App.ERC20proxy = new web3.eth.Contract(ERC20JSON.abi, ERC20proxyAddress);
			}

		} catch (error) {
			console.error(error);

		}
	},

	// render account addresses as inner text
	renderAdresses: async () => {
		const addressTranslator = new AddressTranslator();
		const polyjuiceAddress = addressTranslator.ethAddressToGodwokenShortAddress(App.account);
		const depositAddress = await addressTranslator.getLayer2DepositAddress(web3, App.account);
		const balance =
			await App.ERC20proxy.methods.balanceOf(polyjuiceAddress).call({
				from: App.account
			})

		document.getElementById("acc").innerText = "Eth Account: " + App.account;
		document.getElementById("polyjuice-acc").innerText = "Polyjuice Account: " + polyjuiceAddress;
		document.getElementById("deposit-address").innerText = depositAddress.addressString;
		document.getElementById("token-balance").innerText = "Your token balance is: " + balance;

	},

	render: async () => {
		// Prevent double render
		if (App.loading) {
			return
		}

		// Update app loading state
		App.setLoading(true)
		console.log(App.account)
		// Render Account
		$('#account').html(App.account)

		// Render Tasks
		await App.renderTasks()

		// Update loading state
		App.setLoading(false)
	},

	renderTasks: async () => {
		// Load the total task count from the blockchain
		const taskCount = await App.TodoList.methods.taskCount().call({
			gas: 6000000,
			from: App.account,
		});
		const $taskTemplate = $('.taskTemplate')
		console.log(App.TodoList);

		// Render out each task with a new task template
		for (var i = 1; i <= taskCount; i++) {
			// Fetch the task data from the blockchain
			const task = await App.TodoList.methods.tasks(i).call({
				gas: 9000000,
				from: App.account,
			});

			const taskId = parseInt(task[0])
			const taskContent = task[1]
			const taskCompleted = task[2]
			console.log("heer")
			console.log(taskId + "\n" + taskContent + "\n" + taskCompleted)

			// Create the html for the task
			const $newTaskTemplate = $taskTemplate.clone()
			$newTaskTemplate.find('.content').html(taskContent)
			$newTaskTemplate.find('input')
				.prop('name', taskId)
				.prop('checked', taskCompleted)
				.on('click', App.toggleCompleted)

			// Put the task in the correct list
			if (taskCompleted) {
				$('#completedTaskList').append($newTaskTemplate)
			} else {
				$('#taskList').append($newTaskTemplate)
			}

			// Show the task
			$newTaskTemplate.show()
		}
	},

	createTask: async () => {
		App.setLoading(true)
		console.log(App.account);
		const content = $('#newTask').val()
		try {
			await App.TodoList.methods.createTask(content).send({
				gas: 6000000,
				from: App.account,
			});
			alert("After the transaction completes, please refresh the webpage.")
		} catch (error) {
			console.error(error);
		}
		window.location.reload()
	},

	toggleCompleted: async (e) => {
		App.setLoading(true)
		const taskId = e.target.name
		await App.TodoList.methods.toggleCompleted(taskId).send({
			gas: 6000000,
			from: App.account,
		});
		window.location.reload()
	},

	setLoading: (boolean) => {
		App.loading = boolean
		const loader = $('#loader')
		const content = $('#content')
		if (boolean) {
			loader.show()
			content.hide()
		} else {
			loader.hide()
			content.show()
		}
	}
}

$(() => {
	$(window).load(() => {
		App.load()
	})
})
