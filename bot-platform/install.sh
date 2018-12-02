#!/bin/bash
backend-service npm install; 
git clone https://github.com/islanderz/taskerapp-master/session-service/session-service.git; 
session-service/redis/redis-4.0.9/ make; 
