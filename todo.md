# to do

1. registration success page

# apis

.then((resp) => {
console.log(resp.data)
}).catch((err) => {
console.log(err.response.data)
}).finally(() => {
setLoaderHidden(true)

})

setAlerts([
{
message: "Patient queued successfully",
theme: "primary",
timeout: 3,
},
]);

const config = {
headers: { Authorization: `Bearer ${user.token}` },
}
