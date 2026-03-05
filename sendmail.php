<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // YOUR TEST EMAIL
    $to = "sravan.ksk0507@gmail.com";

    $email_subject = "Website Test Inquiry: $subject";

    $email_body = "
New website message:

Name: $name
Email: $email
Phone: $phone
Subject: $subject

Message:
$message
";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "<script>
        alert('Message sent successfully!');
        window.location.href='contact.html';
        </script>";
    }
    else {
        echo "<script>
        alert('Message failed to send.');
        window.location.href='contact.html';
        </script>";
    }

}

?>