const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Madrid", "Paris"],
        correctAnswer: 3,
        points: 2
    },
    {
        question: "Which is the largest planet in our solar system?",
        choices: ["Venus", "Jupiter", "Saturn", "Mars"],
        correctAnswer: 1,
        points: 1
    },
    {
        question: "What is the symbol for Iron in the periodic table?",
        choices: ["Fe", "Ir", "In", "I"],
        correctAnswer: 0,
        points: 3
    },
    {
        question: "Which of the following is a primary color?",
        choices: ["Green", "Yellow", "Orange", "Blue"],
        correctAnswer: 3,
        points: 1
    },
    {
        question: "What is the largest mammal in the world?",
        choices: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: 1,
        points: 3
    },
    {
        question: "What does API stand for?",
        choices: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Algorithmic Programming Interface"],
        correctAnswer: 0,
        points: 2
    }
];

let qNumber = 0;
let points = 0;
let firstNameContent = '';

$(document).ready(function () {
    $(".points, .questions").hide();
    $('#play-button').addClass('disabled');
});


function checkInput() {
    firstNameContent = $("#firstName").val().trim();
    const lastNameContent = $("#lastName").val().trim();

    const validFirstName = /^[a-zA-Z\s]+$/.test(firstNameContent);
    const validLastName = /^[a-zA-Z\s]+$/.test(lastNameContent);

    const bothFieldsValid = validFirstName && validLastName;

    if(bothFieldsValid){
        $('#play-button').removeClass('disabled');
    }
    else{
        $('#play-button').addClass('disabled');
    }


    $('#play-button').prop('disabled', !bothFieldsValid);
};

$(document).on('keyup', '#firstName, #lastName', checkInput);

$(document).on('click', '#play-button', function (event) {
    event.preventDefault();
    $(".homePage").hide();
    $(".questions").show();
    showQuestions(qNumber);
});

$(document).on('click', '#next-button', function (event) {
    event.preventDefault();
    temp = qNumber;
    qNumber ++;

    checkAnswer(temp);
    showQuestions(qNumber);
});

function showQuestions(n) {
    if (n === quizData.length) {
        showPoints();
        return;
    }
    else if (n == quizData.length - 1) {
        $("#next-button").text("Submit");
    }


    $(".question_Number").text("Question " + (n + 1));
    $('.question').text(quizData[n].question);
    $("label[for='firstRadio']").text(quizData[n].choices[0]);
    $("label[for='secondRadio']").text(quizData[n].choices[1]);
    $("label[for='thirdRadio']").text(quizData[n].choices[2]);
    $("label[for='fourthRadio']").text(quizData[n].choices[3]);

    $("#firstRadio").val(quizData[n].choices[0]);
    $("#secondRadio").val(quizData[n].choices[1]);
    $("#thirdRadio").val(quizData[n].choices[2]);
    $("#fourthRadio").val(quizData[n].choices[3]);

    $('.mainForm')[0].reset();
    $("#next-button").addClass('disabled');
    $("#next-button").prop('disabled', true);

}

$('.mainForm').on('change', 'input[type="radio"]', function() {
    const selectedRadio = $('.mainForm').find('input[type="radio"]:checked');

    if (selectedRadio.length > 0) {
        $("#next-button").removeClass('disabled');
        $("#next-button").prop('disabled', false);
    } else {
        $("#next-button").addClass('disabled');
        $("#next-button").prop('disabled', true);
    }
});

function checkAnswer(n) {
    const selectedAnswer = $("input[name='Answer']:checked").val();

    let correct = quizData[n].choices[quizData[n].correctAnswer]
    if (selectedAnswer === correct) {
        points += quizData[n].points;
    }
}

function showPoints() {
    $(".questions").hide();
    $(".points").show();

    $(".table tr:eq(1) td:eq(1)").text(points);
    $(".table tr:eq(1) td:eq(0)").text(firstNameContent);
    $(document).on('click', '#play-again-button', function (event) {
        location.reload();
    });
}

