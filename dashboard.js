let searchBtn = $("#search-form-btn");
let searchForm = $("#search-form");
let searchQuery = $("#search-query");
let searchType = $("#search-type");
let searchResult = $("#search-result");
let searchCollege = $("#search-college");
let similarCollege = $("#similar-college");
let similarResult = $("#similar-result");
let percentClgCanvas = $("#percent-college-canvas");
let clgDetailResult = $("#college-detail-result");
let studentListResult = $("#student-list-result");
let studentDetailResult = $("#student-detail-result");
let baseURL = "https://college-view.herokuapp.com/";
let currCollege = null;

searchResult.hide();
similarCollege.hide();

let drawChart = (labels, dataIn, canvas) => {
  let ctx = canvas.getContext("2d");
  var gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "#FEAC5E");
  gradient.addColorStop(0.5, "#C779D0");
  gradient.addColorStop(1, "#4BC0C8");
  console.log(gradient);
  var piechart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          backgroundColor: gradient,
          data: dataIn,
        },
      ],
      labels,
    },
    options: {
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
  canvas.onclick = (e) => {
    var clickedPoint = piechart.getElementsAtEvent(e);
    if (clickedPoint[0]) {
      var chartData = clickedPoint[0]["_chart"].config.data;
      var idx = clickedPoint[0]["_index"];
      var label = chartData.labels[idx];
      getCollegeInState(label);
    }
  };
};

// ***************
// Percent college per state
// ***************

$.get({ url: `${baseURL}college/count/state` })
  .done(({ college }) => {
    let labels = [];
    let data = [];
    college.forEach((clg) => {
      labels.push(clg._id);
      data.push(clg.count);
    });
    drawChart(labels, data, percentClgCanvas[0]);
  })
  .fail((err) => {
    console.log(err);
  });

// ***************
// Get college in state
// ***************
let displayColleges = (college) => {
  let inject = "";
  college.forEach((clg) => {
    inject += `<div class="card mt-2">
      <div class="card-body card-shrink" id=${clg.id}>
        <div>${clg.id}</div>
        <div class="text-muted">${clg.name}</div>
        <div class="blue-font pointer">Get students ></div>
      </div>
    </div>`;
  });
  clgDetailResult.html(inject);
  $("#college-detail-result > div.card > div.card-body > .pointer").on(
    "click",
    (e) => {
      let id = $(e.target).parent()[0].id;
      getStudentsInCollege(id);
    }
  );
};

let getCollegeInState = (state) => {
  $.get({ url: `${baseURL}college/state/${state}` })
    .done(({ college }) => {
      displayColleges(college);
      $("#college-detail > div > header > span").html("in " + state);
    })
    .fail((err) => {
      console.log(err);
    });
};

// ***************
// get students in college
// ***************

let showStudentsList = (students) => {
  let inject = "";
  students.forEach((student) => {
    inject += `<div class="card mt-2">
      <div class="card-body card-shrink" id=${student._id}>
        <div>${student.id}</div>
        <div class="text-muted">${student.name}</div>
        <div class="blue-font pointer">Get detail ></div>
      </div>
    </div>`;
  });
  studentListResult.html(inject);
  $("#student-list-result > div.card > div.card-body > .pointer").on(
    "click",
    (e) => {
      let id = $(e.target).parent()[0].id;
      getStudentDetail(id);
    }
  );
};

let getStudentsInCollege = (collegeID) => {
  $.get({ url: `${baseURL}college/${collegeID}/students` })
    .done(({ students }) => {
      showStudentsList(students);
      $("#student-list > div > header > span").html("in " + collegeID);
    })
    .fail((err) => console.log(err));
};

// ***************
// student detail
// ***************

let showStudentDetail = (student) => {
  studentDetailResult.html(
    `<div><b>ID: </b>${student.id}</div>
  <div><b>Name: </b>${student.name}</div>
  <div><b>Batch: </b>${student.batch}</div>
  <div><b>College: </b>${student.college_id.name}</div>
  <div><b>Skills: </b>${student.skills.join(", ")}</div>
  `
  );
};

let getStudentDetail = (_id) => {
  $.get({ url: `${baseURL}student/${_id}` })
    .done(({ student }) => {
      // console.log(student);
      showStudentDetail(student);
    })
    .fail((err) => {
      console.log(err);
    });
};

// ***************
// Search college
// ***************
let displayResult = (college) => {
  currCollege = college._id;
  let inject = `<hr/> <div class="row">
  <div class="col-md-12">
    <b>Name:</b> ${college.name}
  </div>
  <div class="col-sm-6"><b>ID:</b> ${college.id}</div>
  <div class="col-sm-6"><b>Founded:</b> ${college.founded}</div>
  <div class="col-md-6"><b>City:</b> ${college.city}</div>
  <div class="col-md-6">
    <b>State:</b> ${college.state}
  </div>
  <div class="col-md-12"><b>Country:</b> ${college.country}</div>
  <div class="col-md-12"><b>Courses Offered: </b> ${college.courses.join(
    ", "
  )} </div>
  <div class="col-md-12"><b>No. of students</b> ${college.studentsNum}</div>
</div>
<hr />
<div class="row text-right">
<div class="col-md-12">
    <b class="blue-font pointer" onclick="findSimilar()"
    >Find similar colleges ></b
    >
</div>
</div>`;
  searchResult.html(inject);
};
let showNoResult = () => {
  let inject = `<hr />
    <div class="row">
      <div class="col-md-12 text-center">
        <img
          src="./static/not-found.svg"
          alt="Not found"
          id="not-found-vector"
        />
        <br />
        <span class="blue-font"
          >Looks like we cannot find what you were searching for</span
        >
      </div>
    </div>`;
  searchResult.html(inject);
};

searchForm.on("submit", (e) => {
  let searchTypeVal = searchType.val();
  let query = encodeURI(searchQuery.val());
  e.preventDefault();
  $.get({ url: `${baseURL}college/${searchTypeVal}/${query}` })
    .done(({ college }) => {
      if (college === null) showNoResult();
      else displayResult(college);
      searchResult.show();
    })
    .fail((err) => console.log(err));
});

// ***************
// Similar colleges
// ***************

let findSimilar = () => {
  similarCollege.show();
  $("html, body").animate(
    {
      scrollTop: $("#similar-college").offset().top,
    },
    500
  );
  $.get({
    url: `${baseURL}college/similar/${currCollege}`,
  })
    .done(({ college }) => {
      let inject = "";
      college.forEach((clg) => {
        inject =
          inject +
          `
        <tr id=${clg.id} class="pointer">
            <td>${clg.id}</td>
            <td>${clg.name}</td>
            <td>${clg.city}</td>
        </tr>`;
      });
      similarResult.html(inject);
      $("#similar-result > tr").on("click", showSimilarDetail);
    })
    .fail((err) => console.log(err));
};

let showSimilarDetail = (e) => {
  let id = $(e.target).parent()[0].id;
  searchType.val("id");
  searchQuery.val(id);
  $("html, body").animate(
    {
      scrollTop: $("#search-college").offset().top - 70,
    },
    500
  );
  $.get({ url: `${baseURL}college/id/${id}` })
    .done(({ college }) => {
      if (college === null) showNoResult();
      else displayResult(college);
      searchResult.show();
    })
    .fail((err) => console.log(err));
};
