const data = [
    {
        id: "team", type: "text"
    },
    {
        id: "match", type: "text"
    },
    {
        id: "alliance", type: "toggle"
    },
    {
        id: "auton_moved", type: "toggle"
    },
    {
        id: "auton_cones_low", type: "number"
    },
    {
        id: "auton_cones_mid", type: "number"
    },
    {
        id: "auton_cones_high", type: "number"
    },
    {
        id: "auton_cubes_low", type: "number"
    },
    {
        id: "auton_cubes_mid", type: "number"
    },
    {
        id: "auton_cubes_high", type: "number"
    },
    {
        id: "auton_station", type: "toggle"
    },
    {
        id: "teleop_cones_low", type: "number"
    },
    {
        id: "teleop_cones_mid", type: "number"
    },
    {
        id: "teleop_cones_high", type: "number"
    },
    {
        id: "teleop_cubes_low", type: "number"
    },
    {
        id: "teleop_cubes_mid", type: "number"
    },
    {
        id: "teleop_cubes_high", type: "number"
    },
    {
        id: "teleop_station", type: "toggle"
    },
    {
        id: "notes", type: "text"
    }
]

const socket = io("localhost:80");

$(window).on("load", async () => {
    $(".number").each(function () {
        let num = $(this).find(".value");
        num.val(0);
        $(this).find(".decr").click(() => {
            let val = +num.val();
            num.val(val - 1);
        });
        $(this).find(".incr").click(() => {
            let val = +num.val();
            num.val(val + 1);
        });
    });
    $(".toggle").each(function () {
        let toggle = $(this);
        toggle.val(toggle.find(".true").text());
        toggle.find("> div").click(function () {
            toggle.find("> div").removeClass("true");
            $(this).addClass("true");
            toggle.val($(this).text());
        });
    });
    var loading = false;
    $("#submit").click(() => {
        if (loading) return;
        loading = true;
        let values = data.reduce((a, b) => {
            let el = $("#" + b.id);
            if (b.type == "number")
                a[b.id] = +el.val();
            if (b.type == "text")
                a[b.id] = el.val();
            if (b.type == "toggle")
                a[b.id] = el.find(".true").text();
            return a;
        }, {});
        socket.emit("submit", values, () => {
            loading = false;
            alert("Submitted!");
        });
    });
});