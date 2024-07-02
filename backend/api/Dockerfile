FROM golang:1.22.3-alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

EXPOSE 8080

CMD [ "go", "run", "cmd/main.go" ]


# ---


# # Use a specific version of the Go image
# FROM golang:1.22.3-alpine AS builder

# # Set the working directory inside the container
# WORKDIR /app

# # Copy go.mod and go.sum to the working directory and download dependencies
# COPY go.mod go.sum ./

# RUN go mod download

# # Copy the rest of the source code
# COPY . .

# # # Build the Go binary
# RUN go build -o main cmd/main.go

# # # Use a minimal base image for the final stage
# FROM alpine:latest

# # # Set the working directory for the final image
# WORKDIR /root/

# # # Copy the binary from the builder stage
# COPY --from=builder /app/main .

# # Expose the necessary port
# EXPOSE 8080

# # # Run the compiled binary
# CMD ["./main"]
