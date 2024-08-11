# Task Reminder Telegram Bot

A Telegram bot to manage and remind you of your tasks.

## Features

- Add tasks with due dates and with recurrence if need
- View your tasks, update or delete as you need.
- Receive reminders for upcoming tasks.
- Check your telegram id uisng the bot.
- Check your due tasks with telegram bot.

## Installation

1. Clone the repository:
    ```bash
    https://github.com/Soap171/Task-Reminder-Telegram-Bot.git
    cd server (for the backend)
    cd client (for the react frontend)
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
3. Open the telegram app and go to Botfather and create a bot for yourself work.
4. Set up environment variables:
    Create a `.env` file in the root directory and add your Telegram bot token:
    ```env
    TELEGRAM_BOT_TOKEN=your-telegram-bot-token
    MONGODB_URI = "your mongodb url"
    JWT_SECRET = "your secret key"
    PORT = "your port number"
    ```

5. Start the bot:
    ```bash
    npm run dev to start the server
    npm start to start the react app
    ```

## Usage
 
1. Start a chat with your Telegram bot.
2. Use the following commands to interact with the bot:
    - `/mytasks` - View your tasks
    - `/myid` - Get your Telegram ID

## API Documentation

For detailed API documentation, please visit [API Documentation](https://documenter.getpostman.com/view/33861954/2sA3s1pCcg).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
