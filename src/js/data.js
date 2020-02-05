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