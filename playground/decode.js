var decode = require("jwt-decode");
var token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWM5YTFlOGQ0ZDM3MGQyNWM0ZDkzMDE1IiwiaWF0IjoxNTU0MzYwMjExfQ.I6NRaZon5SRjm2-ooB_fDjv3kKXwNQS3uH1DIPZhZyQ";
var decoded = decode(token);
console.log(decoded);
