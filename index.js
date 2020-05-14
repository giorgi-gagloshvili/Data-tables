const Filters = {

	// Object properties
	data: data,
	perPage: document.getElementById("sel").value,
	pageInit: 0,
	start: null,
	end: null,

	init() {
		this.setStart()
		this.setEnd()
		this.renderPagin(this.start, this.end)
	},

	// getter methods
 	totalPages() {
		return Math.ceil(this.data.length / this.perPage)
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
		let val = document.getElementById("search").value
		let d = this.data.filter(item => item.first_name.toLowerCase().indexOf(val.toLowerCase()) !== -1)
		
		let container = document.getElementById("data-tables")
		let content = ""

		// let sel = parseInt(document.getElementById("sel").value)

		// console.log(d)
		if(val !== "") {
			for(let i = 0; i < this.perPage; i++) {
				if(i < d.length) {
					content += "<tr>"
					content += `<td>${d[i].first_name}</td>`
					content += `<td>${d[i].last_name}</td>`
					content += `<td>${d[i].position}</td>`
					content += `<td>${d[i].salary}</td>`
					content += `<td>${d[i].age}</td>`
					content += `</tr>`
				
				}	
			}
			this.rawCounter(d.length)
		} else {
			for(let i = 0; i < this.perPage; i++) {
				if(i < this.data.length) {
					content += "<tr>"
					content += `<td>${this.data[i].first_name}</td>`
					content += `<td>${this.data[i].last_name}</td>`
					content += `<td>${this.data[i].position}</td>`
					content += `<td>${this.data[i].salary}</td>`
					content += `<td>${this.data[i].age}</td>`
					content += `</tr>`
				}
			}
			this.rawCounter(this.data.length)
		}
		
		container.innerHTML = content
		
	},

	sort() {
		this.perPage = parseInt(document.getElementById("sel").value)
		let container = document.getElementById("data-tables")
		let content = ""
		// console.log(this.perPage)

		for(let i = 0; i < this.perPage; i++) {
			if(i < this.data.length) {
				content += "<tr>"
				content += `<td>${this.data[i].first_name}</td>`
				content += `<td>${this.data[i].last_name}</td>`
				content += `<td>${this.data[i].position}</td>`
				content += `<td>${this.data[i].salary}</td>`
				content += `<td>${this.data[i].age}</td>`
				content += `</tr>`
			}
		}
		container.innerHTML = content
		if(this.perPage > this.data.length)
			this.perPage = this.data.length
		this.rawCounter(1, this.perPage, this.data.length)

	},

	rawCounter(start, end, total) {
		let sel = document.getElementById("data-tables").children.length
		let rawCount = document.getElementById("raw-count")
		rawCount.textContent = `${start} - ${end} of ${total}`
	},

	renderPagin(start, end) {
		let container = document.getElementById("data-tables")
		let content = ""

		// console.log(this.start, this.end)

		for(let i = start; i < end; i++) {
			if(i < this.data.length) {
				content += "<tr>"
				content += `<td>${this.data[i].first_name}</td>`
				content += `<td>${this.data[i].last_name}</td>`
				content += `<td>${this.data[i].position}</td>`
				content += `<td>${this.data[i].salary}</td>`
				content += `<td>${this.data[i].age}</td>`
				content += `</tr>`
			}
		}

		container.innerHTML = content
		if(end > this.data.length) end = this.data.length
		this.rawCounter(start + 1, end, this.data.length)
	},

	prevPage() {
		if(this.pageInit === 0) return
		this.pageInit = this.pageInit - 1
		let start = this.pageInit * this.perPage
		let end = parseInt(start) + parseInt(this.perPage)
		console.log(start, end)
		this.renderPagin(start, end)
		this.rawCounter(start + 1, end, this.data.length)
	},
	nextPage() {
		if(this.pageInit === this.totalPages() - 1) return
		this.pageInit = this.pageInit + 1
		let start = this.pageInit * this.perPage
		let end = parseInt(start) + parseInt(this.perPage)
		console.log(start, end)
		this.renderPagin(start, end)
		this.rawCounter(start + 1, end, this.data.length)
	}


}

Filters.init(Filters.data, 5)
Filters.rawCounter(1, Filters.perPage, Filters.data.length)

// https://morioh.com/explore?next=%2F
// https://www.photopea.com/