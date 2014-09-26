// SAMPLE
this.manifest = {
    "name": "Save 2 WP",
    "icon": "../../icons/icon48.png",
    "settings": [
        {
            "tab": i18n.get("WP config"),
            "group": i18n.get("login"),
            "name": "wp_username",
            "type": "text",
            "label": i18n.get("username"),
            "text": i18n.get("x-characters")
        },
        {
            "tab": i18n.get("WP config"),
            "group": i18n.get("login"),
            "name": "wp_password",
            "type": "text",
            "label": i18n.get("password"),
            "text": i18n.get("x-characters-pw"),
            "masked": true
        },
        {
            "tab": i18n.get("WP config"),
            "group": i18n.get("login"),
            "name": "wp_url",
            "type": "text",
            "label": i18n.get("wp-url"),
            "text": i18n.get("x-wp-url")
        },
        {
            "tab": i18n.get("WP config"),
            "group": i18n.get("login"),
            "name": "myDescription",
            "type": "description",
            "text": i18n.get("description")
        },
        {
            "tab": i18n.get("Readability config"),
            "group": i18n.get("Authentication"),
            "name": "readability_token",
            "type": "text",
            "label": i18n.get("Token"),
            "text": i18n.get("Readability token")
        },
        {
            "tab": i18n.get("Readability config"),
            "group": i18n.get("Authentication"),
            "name": "readabilitydesc",
            "type": "description",
            "text": i18n.get("readabilitydesc")
        }
    ],
    "alignment": [
        [
            "wp_username",
            "wp_password"
        ],
        [
            "readability_token"
        ]
    ]
};
