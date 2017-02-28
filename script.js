function loadData() {
	$.getJSON('scores.json', function(data) {
		var entries = [];
		$.each(data, function(index, value) {
			var entry = {'hello': 'world'};
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
			});
			entries.push(entry);
		});
	});
}

$(document).ready(function() {
	loadData();
});