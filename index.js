const Filters = {

	// Object properties
	data: data,
	perPage: document.getElementById("sel").value,
	pageInit: 0,
	start: null,
	end: null,
	searchResult: '',
	totalPages: Math.ceil(data.length / this.perPage),

	init() {
		this.setStart()
		this.setEnd()
		this.render(this.start, this.end, this.data)
	},

	// setter methods
	setStart() {
		this.start = this.pageInit * this.perPage
	},

	setEnd() {
		this.end = this.pageInit * parseInt(this.perPage) + parseInt(this.perPage)
	},

	// Methods
	searchMethod() {
		this.searchResult = document.getElementById("search").value
		this.init()		
	},

	sort() {
		this.perPage = parseInt(document.getElementById("sel").value)
		this.init()
	},

	rawCounter(start, end, total) {
		let sel = document.getElementById("data-tables").children.length
		let rawCount = document.getElementById("raw-count")
		rawCount.textContent = `${start} - ${end} of ${total}`
	},

	render(start, end, data) {
		let container = document.getElementById("data-tables")
		let content = ""
		// console.log(data, start, end, 'RENDER')

		if(this.searchResult !== '') {
			data = data.filter(item => item.first_name.toLowerCase().indexOf(this.searchResult.toLowerCase()) !== -1)
		}

		for(let i = start; i < end; i++) {
			if(i < data.length) {
				content += "<tr>"
				content += `<td>${data[i].first_name}</td>`
				content += `<td>${data[i].last_name}</td>`
				content += `<td>${data[i].position}</td>`
				content += `<td>${data[i].salary}</td>`
				content += `<td>${data[i].age}</td>`
				content += `</tr>`
			}
		}

		container.innerHTML = content
		this.totalPages = Math.ceil(data.length / this.perPage)
		if(end > data.length) end = data.length
		this.rawCounter(start + 1, end, data.length)
	},

	prevPage() {
		if(this.pageInit === 0) return
		this.pageInit = this.pageInit - 1
		this.start = this.pageInit * this.perPage
		this.end = parseInt(this.start) + parseInt(this.perPage)
		this.init()
	},
	
	nextPage() {
		if(this.pageInit === this.totalPages - 1) return
		this.pageInit = this.pageInit + 1
		this.start = this.pageInit * this.perPage
		this.end = parseInt(this.start) + parseInt(this.perPage)
		this.init()
		
	}


}

Filters.init(Filters.data, 5)
Filters.rawCounter(1, Filters.perPage, Filters.data.length)

// https://morioh.com/explore?next=%2F
// https://www.photopea.com/