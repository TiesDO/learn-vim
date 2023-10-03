package main

import (
	"fmt"
	"net/http"

    "github.com/TiesDO/learn-vim/internal/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

func main() {
    // Create a new echo instance
    e := echo.New()

    // Set the log level
    e.Logger.SetLevel(log.INFO)

    // Use a custom error handler
    e.HTTPErrorHandler = handleMyError

    // Attach the routes
    err := routes.Setup(e)

    if err != nil {
        panic(fmt.Sprintln("Failed to setup routes: ", err))
    }

    // start a go routine for non-blocking request handling

    e.Start(":5001")
}

// Custom echo request error handler
func handleMyError(err error, c echo.Context) {
    code := http.StatusInternalServerError

    // override existing http code with the error specific
    // http code if provided in the error
    if he, ok := err.(*echo.HTTPError); ok {
        code = he.Code
    }

    // format the error message
    host := c.Request().Host
    URI := c.Request().RequestURI
    qs := c.QueryString()

    message := fmt.Sprintf(" on: %s%s%s error code %d", host, URI, qs, code)

    c.Logger().Error(err, message)
}
