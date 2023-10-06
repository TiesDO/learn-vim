package routes

import (
	"html/template"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Setup(e *echo.Echo) error {
    // load html templates
    template := template.Must(template.ParseFiles("web/templates/index.html"))

    e.Renderer = &Template{
        templates: template,
    }

    e.GET("/", func(c echo.Context) error {
        return c.Render(http.StatusOK, "index", "Test")
    })

    e.GET("/name", func(c echo.Context) error {
        return c.String(http.StatusOK, "Hello, HTMX!")
    })

    return nil
}

type Template struct {
    templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
    return t.templates.ExecuteTemplate(w, name, data)
}

