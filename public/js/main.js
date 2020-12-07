firebase.initializeApp({
	apiKey: 'AIzaSyBkM9aSECzlwoAxJot9abJDEf37ErBLTPc',
	authDomain: 'debukstor.firebaseapp.com',
	databaseURL: 'https://debukstor.firebaseio.com',
	projectId: 'debukstor',
	storageBucket: 'debukstor.appspot.com',
	messagingSenderId: '273811292668',
	appId: '1:273811292668:web:e94892986f574eac373279',
	measurementId: 'G-CDNFLYTXJ1'
});

const database = firebase.firestore();
const storage = firebase.storage();

(async function () {
	const query = await database.collection('books').get();
	const node = document.querySelector('main');
	query.forEach(async doc => {
		const data = doc.data();
		const cover = await storage.refFromURL(`${data.cover}`).getDownloadURL();
		node.innerHTML += `
			<div id="${doc.id}" class="card shadow-sm">
				<img class="card-img-top border-bottom" src="img/noCover.png">
				<div class="card-body">
					<h5 class="card-title">${data.title}</h5>
					<h6 class="card-subtitle h4 text-right text-muted font-weight-bold mt-4">${data.price}€</h6>
					<div class="card-body collapse border-top mt-4">
						<div class="card-text text-justify"><small>${data.synopsis}</small></div>
					</div>
					<a class="card-link stretched-link" data-toggle="collapse" href="#${doc.id} .collapse"></a>
				</div>
			</div>
		`;
		document.querySelector(`#${doc.id} img`).src = cover;
	});
})();

