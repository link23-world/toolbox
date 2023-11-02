$(function() {
  const tools = loadTools();
  $(".tool_card").css("background-color", "gray");

  var table = new Tabulator("#toolboxTable", {
    data: tools,
    layout: "fitColumns",
    height: "100%",
    minHeight: "0",
    headerFilter: "input",
    rowFormatter: addLink,
    columns: [
      { title: "Name", field: "name", formatter: "textarea" },
      { title: "RAG", field: "rating", width: 1, formatter: colorBox,
          headerSort: false, hozAlign: "center"},
      { title: "Group", field: "group"},
      { title: "Tag", field: "tags", headerSort: false}
    ]});

  table.on("rowClick", function(e, row){
    printTool(row.getData());
  });

  printTool = function (tool) {

    if (tool === undefined) {
      $("#tool_name").html("Tool not found");
      $(".tool_card").css("background-color", "gray");
      return null;
    }

    for (key in tool) {
      $(`#tool_${key}`).html(tool[key]);
    }


    $(`#tool_rating`).css("color", getCol("red"));

    getStatus(tool["rating"]);
  }

  getCol = function (col) {
    switch (col) {
      case "green":
        return "#26913d";
      case "amber":
        return "#FFB300";
      case "red":
        return "#DF007D";
      default:
        return "gray";
    }
  }

  getStatus = function (col, longForm = true, cell = null, colPhrase = true) {
    switch (col) {
      case "green":
        if (cell !== null) {
          cell.getElement().style.backgroundColor = "#26913d";
          cell.getElement().style.color = "white";
        }
        colPhrase && $(".tool_card").css("background-color", "#26913d");
        return longForm ? "✅ Generally accepted for use in the context defined" :
          "Generally accepted";
      case "amber":
        if (cell !== null) {
          cell.getElement().style.backgroundColor = "#FFB300";
          cell.getElement().style.color = "white";
        }
        colPhrase && $(".tool_card").css("background-color", "#FFB300");
        return longForm ? "⚠️ Be aware that there are multiple definitions based on different contexts" :
          "Be aware of context";
      case "red":
        if (cell !== null) {
          cell.getElement().style.backgroundColor = "#DF007D";
          cell.getElement().style.color = "white";
        }
        colPhrase && $(".tool_card").css("background-color", "#DF007D");
        return longForm ? "❌ This term should be avoided and there are better alternatives" :
          "Avoid this term";
      case "grey":
        if (cell !== null) {
          cell.getElement().style.backgroundColor = "gray";
          cell.getElement().style.color = "white";
        }
        colPhrase && $(".tool_card").css("background-color", "gray");
        return longForm ? "❓ This entry is unfinished and is still pending classification" :
          "Pending classification";
      default:
        break;
    }
  }

  $('select').selectpicker();
    var filtCond = $("#filter-cond");
    var filtStatus = $("#filter-status");

    //Trigger setFilter function with correct parameters
  function updateFilter() {
    var valCond = filtCond.val();
    var valStatus = filtStatus.val();
    table.setFilter(customFilter, {cond: valCond, status : valStatus});
    }

  //Update filters on value change
  filtCond.on("change", updateFilter);
  filtStatus.on("change", updateFilter);

  function customFilter(data, filterParams){
    if (filterParams.cond === "in") {
      return filterParams.status.includes(data.status[0]);
    } else {
      return !filterParams.status.includes(data.status[0]);
    }
  }

  //Clear filters on "Clear Filters" button click
  $("#filter-clear").on("click", function () {
    $('.selectpicker').selectpicker('deselectAll')

    table.clearFilter();
  });

  function addLink(row) {
    let name = row.getCells()[0];
    name.getElement().innerHTML = `<a href=${row.getData()["url"]}>${name.getValue()}</a>` ;
  }

  function colorBox(row) {
    row.getElement().style.backgroundColor = getCol(row.getValue());
    row.getElement().style.fontWeight = "bold";
    let rag = row.getValue();
    if (rag === undefined) {
      return null;
    } else {
      return rag[0].toUpperCase();
    }
  }

});