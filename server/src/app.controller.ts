import { Controller, Get } from "@nestjs/common";

@Controller("app")
export class AppController {
    @Get()
    getSomething() {
        return "1hello world 9999";
    }
}
