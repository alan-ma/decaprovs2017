var entries = [];
var search_results = [];
var universal_sort_key = ''

function loadData() {
	$.getJSON('scores.json', function(data) {
		$.each(data, function(index, value) {
			var entry = {};
			$.each(value, function(key, val) {
				switch(key) {
					case 'FIELD1':
						entry.series = val;
						break;
					case 'FIELD2':
						entry.id = val;
						break;
					case 'FIELD3':
						entry.chapter = val;
						break;
					case 'FIELD4':
						entry.exam = val;
						break;
					case 'FIELD5':
						entry.oral_one = val;
						break;
					case 'FIELD6':
						entry.oral_two = val;
						break;
					case 'FIELD7':
						entry.penalty = val;
						break;
					case 'FIELD8':
						entry.overall = val;
						break;
					case 'FIELD9':
						entry.test_rank = val;
						break;
					case 'FIELD10':
						entry.oral_one_rank = val;
						break;
					case 'FIELD11':
						entry.oral_two_rank = val;
						break;
					case 'FIELD12':
						entry.overall_rank = val;
						break;
					default:
						console.log('field not found.');
				}
				entry.index = index;
			});
			entries.push(entry);
		});
	});
}

function display_results() {
	if (search_results.length > 0) {
		$('#no_result').css('display', 'none');
		var counter = 0;
		$.each(search_results, function(index, value) {
			var id = counter.toString() + '-' + value.id;
			if (counter % 2 == 0) {
				$('#results').append('<div id="' + id + '" class="row"></div>');
			} else {
				$('#results').append('<div id="' + id + '" class="row gray"></div>');
			}
			
			$('#' + id).append('<div class="col col-xs-1">' + value.series + '</div><div class="col col-xs-1">' + value.id + '</div><div class="col col-xs-1">' + value.chapter + '</div><div class="col col-xs-1">' + value.exam + '</div><div class="col col-xs-1">' + value.oral_one + '</div><div class="col col-xs-1">' + value.oral_two + '</div><div class="col col-xs-1">' + value.penalty + '</div><div class="col col-xs-1">' + value.overall + '</div><div class="col col-xs-1">' + value.test_rank + '</div><div class="col col-xs-1">' + value.oral_one_rank + '</div><div class="col col-xs-1">' + value.oral_two_rank + '</div><div class="col col-xs-1">' + value.overall_rank + '</div>')
			counter += 1;
		});
	} else {
		$('#no_result').css('display', 'block');
		console.log('no results');
	}
}

function filter(data, key, filter_by) {
	var filtered = [];
	if (key == "") {
		filtered = data;
	} else {
		$.each(data, function(index, value) {
			switch(filter_by) {
				case 'series':
					if (value.series.toUpperCase() == key.toUpperCase()) {
						filtered.push(value);
					}
					break;
				case 'chapter':
					if (value.chapter.toUpperCase() == key.toUpperCase()) {
						filtered.push(value);
					}
					break;
				case 'id':
					if (value.id == key) {
						filtered.push(value);
					}
					break;
				case 'teams_only':
					if (key == 'yes') {
						if (value.overall_rank != '') {
							filtered.push(value);
						}
					} else {
						filtered.push(value);
					}
					break;
			}
		});
	}
	return filtered;
}

function search(series, id, chapter, key, teams) {
	search_results = [];
	universal_sort_key = key;
	console.log('searching...');
	search_results = filter(entries, series, 'series');
	search_results = filter(search_results, chapter, 'chapter');
	search_results = filter(search_results, id, 'id');
	search_results = filter(search_results, teams, 'teams_only');
	search_results.sort(function(a,b) {
		var backwards = 1;
		switch(universal_sort_key) {
			case 'overall_rank':
				var entryA = a.overall_rank;
				var entryB = b.overall_rank;
				break;
			case 'test_rank':
				var entryA = a.test_rank;
				var entryB = b.test_rank;
				break;
			case 'oral_one_rank':
				var entryA = a.oral_one_rank;
				var entryB = b.oral_one_rank;
				break;
			case 'oral_two_rank':
				var entryA = a.oral_two_rank;
				var entryB = b.oral_two_rank;
				break;
			case 'exam':
				var entryA = a.exam;
				var entryB = b.exam;
				backwards = -1;
				break;
			case 'oral_one':
				var entryA = a.oral_one;
				var entryB = b.overall_rank;
				backwards = -1;
				break;
			case 'oral_two':
				var entryA = a.oral_two;
				var entryB = b.overall_rank;
				backwards = -1;
				break;
			case 'penalty':
				var entryA = a.penalty;
				var entryB = b.penalty;
				backwards = -1;
				break;
		}
		if (entryA == "") {
			return 1;
		} else if (entryB == "") {
			return -1;
		}
		if (entryA < entryB) {
			return (-1*backwards);
		}
		if (entryA > entryB) {
			return (1*backwards);
		} else {
			entryA = a.index;
			entryB = b.index;
			if (entryA < entryB) {
				return -1;
			}
			if (entryA > entryB) {
				return 1;
			} else {
				return 0; // a is equal to b
			}
		}
	});
	display_results();
	console.log('done.');
}

function main() {
	$('#specs').submit(function(event) {
		$('#intro').css('display', 'none');
		$('#loading').css('display', 'block');
		$('#results').css('opacity', 0);
		setTimeout(function() {
			$('#results').remove();
			setTimeout(function() {
				$('#results_container').append('<div class="row" id="results"></div>');
					setTimeout(function() {
					var search_series = $('#specs #series').val();
					var search_id = $('#specs #id').val();
					var search_chapter = $('#specs #chapter').val();
					var search_key = $('#specs #key').val();
					var search_teams = $('#specs #teams_only').val();
					search(search_series, search_id, search_chapter, search_key, search_teams);
					$('#loading').css('display', 'none');
					$('#results').css('opacity', 1);
				}, 100);
			}, 100);
		}, 100);				
		return false;
	});
}

$(document).ready(function() {
	loadData();
	main();
});