function crp() {

    var condition = 1;
    var points = [];//holds the mousedown points
    var canvas = document.getElementById('myCanvas');

    $(function() {
        var ctx = canvas.getContext('2d');
        var imageObj = new Image();

        function init() {
            canvas.addEventListener('mousedown', mouseDown, false);
            canvas.addEventListener('mouseup', mouseUp, false);
            canvas.addEventListener('mousemove', mouseMove, false);
        }

        imageObj.onload = function() {
            ctx.drawImage(imageObj, 0, 0);

        };
        imageObj.setAttribute('crossOrigin', 'anonymous');
        imageObj.src = `https://cors-anywhere.herokuapp.com/${prompt()}`;

        ctx.globalCompositeOperation = 'destination-over';

        $('#myCanvas').mousemove(function(e) {
            if (condition == 1) {

                ctx.beginPath();

                $('#posx').html(e.offsetX);
                $('#posy').html(e.offsetY);
            }
        });

        $('#myCanvas').mousedown(function(e) {
            if (condition == 1) {

                if (e.which == 1) {
                    var pointer = $('<span class="spot">').css({
                        'position': 'absolute',
                        'background-color': '#000000',
                        'width': '5px',
                        'height': '5px',
                        'top': e.pageY,
                        'left': e.pageX
                    });
                    points.push(e.pageX, e.pageY);

                    ctx.globalCompositeOperation = 'destination-out';
                    var oldposx = $('#oldposx').html();
                    var oldposy = $('#oldposy').html();
                    var posx = $('#posx').html();
                    var posy = $('#posy').html();
                    ctx.beginPath();
                    ctx.moveTo(oldposx, oldposy);
                    if (oldposx != '') {
                        ctx.lineTo(posx, posy);

                        ctx.stroke();
                    }
                    $('#oldposx').html(e.offsetX);
                    $('#oldposy').html(e.offsetY);
                }
                $(document.body).append(pointer);
                $('#posx').html(e.offsetX);
                $('#posy').html(e.offsetY);
            }
        });

        $('#crop').click(function() {
            condition = 0;
            $('.spot').each(function() {
                $(this).remove();
            })
            ctx.clearRect(0, 0, 800, 800);
            ctx.beginPath();
            ctx.width = 800;
            ctx.height = 800;
            ctx.globalCompositeOperation = 'destination-over';

            setTimeout(function() {
                var offset = $('#myCanvas').offset();
                for (var i = 0; i < points.length; i += 2) {
                    var x = parseInt(jQuery.trim(points[i]));
                    var y = parseInt(jQuery.trim(points[i + 1]));

                    if (i == 0) {
                        ctx.moveTo(x - offset.left, y - offset.top);
                    } else {
                        ctx.lineTo(x - offset.left, y - offset.top);
                    }
                }
                var pattern = ctx.createPattern(imageObj, "repeat");
                ctx.fillStyle = pattern;
                ctx.fill();

                var dataurl = canvas.toDataURL("image/png");
                document.getElementById('myimg').src = dataurl;
            }, 20);
        });
    });
}