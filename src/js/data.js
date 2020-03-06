const table = [
    {
        "title": "Team #",
        "id": "team_num",
        "type": "number",
    },
    {
        "title": "Match #",
        "id": "match_num",
        "type": "number",
    },
    {
        "title": "Alliance",
        "id": "alliance",
        "type": "opts",
        "opts": ["Red", "Blue"]
    },
    {
        "title": "Auton Move?",
        "id": "auton_move",
        "type": "opts",
        "opts": ["No", "Yes"]
    },
    {
        "title": "Auton",
        "id": "auton",
        "type": "stack",
        "children": [
            {
                "title": "Low Goal",
                "id": "auton_low",
                "type": "number"
            },
            {
                "title": "High Goal",
                "id": "auton_high",
                "type": "stack",
                "children": [
                    {
                        "title": "Near",
                        "id": "auton_high_near",
                        "type": "number"
                    },
                    {
                        "title": "Mid",
                        "id": "auton_high_mid",
                        "type": "number"
                    },
                    {
                        "title": "Trench",
                        "id": "auton_high_trench",
                        "type": "number"
                    },
                    {
                        "title": "Far",
                        "id": "auton_high_far",
                        "type": "number"
                    },
                ]
            },
            {
                "title": "Inner Goal",
                "id": "auton_inner",
                "type": "stack",
                "children": [
                    {
                        "title": "Near",
                        "id": "auton_inner_near",
                        "type": "number"
                    },
                    {
                        "title": "Mid",
                        "id": "auton_inner_mid",
                        "type": "number"
                    },
                    {
                        "title": "Trench",
                        "id": "auton_inner_trench",
                        "type": "number"
                    },
                    {
                        "title": "Far",
                        "id": "auton_inner_far",
                        "type": "number"
                    },
                ]
            }
        ]
    },
    {
        "title": "Teleop",
        "id": "teleop",
        "type": "stack",
        "children": [
            {
                "title": "Low Goal",
                "id": "teleop_low",
                "type": "number"
            },
            {
                "title": "High Goal",
                "id": "teleop_high",
                "type": "stack",
                "children": [
                    {
                        "title": "Near",
                        "id": "teleop_high_near",
                        "type": "number"
                    },
                    {
                        "title": "Mid",
                        "id": "teleop_high_mid",
                        "type": "number"
                    },
                    {
                        "title": "Trench",
                        "id": "teleop_high_trench",
                        "type": "number"
                    },
                    {
                        "title": "Far",
                        "id": "teleop_high_far",
                        "type": "number"
                    },
                ]
            },
            {
                "title": "Inner Goal",
                "id": "teleop_inner",
                "type": "stack",
                "children": [
                    {
                        "title": "Near",
                        "id": "teleop_inner_near",
                        "type": "number"
                    },
                    {
                        "title": "Mid",
                        "id": "teleop_inner_mid",
                        "type": "number"
                    },
                    {
                        "title": "Trench",
                        "id": "teleop_inner_trench",
                        "type": "number"
                    },
                    {
                        "title": "Far",
                        "id": "teleop_inner_far",
                        "type": "number"
                    },
                ]
            }
        ]
    },
    {
        "title": "Color Wheel: Spin Count",
        "id": "spin_count",
        "type": "opts",
        "opts": ["No", "Yes"]
    },
    {
        "title": "Color Wheel: Spin Control",
        "id": "spin_control",
        "type": "opts",
        "opts": ["No", "Yes"]
    },
    {
        "title": "Climb?",
        "id": "climb",
        "type": "opts",
        "opts": ["No", "Yes"]
    },
    {
        "title": "Balance?",
        "id": "balance",
        "type": "opts",
        "opts": ["No", "Yes"]
    },
    {
        "title": "Break?",
        "id": "break",
        "type": "opts",
        "opts": ["No", "Yes"]
    },
    {
        "title": "Notes",
        "id": "notes",
        "type": "text",
        "optional": true
    }
];
table.flatten = () => {
    let arr = [];
    function recur(obj) {
        if (!obj.children || obj.children.length == 0)
            return arr.push(obj);
        obj.children.forEach(recur);
    }
    table.forEach(recur);
    return arr;
};