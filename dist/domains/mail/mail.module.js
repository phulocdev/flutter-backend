"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
console.log((0, path_1.join)(__dirname + '/templates'));
let MailModule = exports.MailModule = class MailModule {
};
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    transport: {
                        host: config.get('EMAIL_HOST'),
                        secure: false,
                        auth: {
                            user: config.get('EMAIL_SENDER'),
                            pass: config.get('EMAIL_APP_PASSWORD')
                        }
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname + '/templates'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true
                        }
                    },
                    preview: config.get('EMAIL_PREVIEW') === 'true' ? true : false
                })
            })
        ],
        providers: [mail_service_1.MailService],
        exports: [mail_service_1.MailService]
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map