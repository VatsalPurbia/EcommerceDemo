"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class BaseEntity {
    constructor(mongoModel) {
        this.model = mongoModel;
    }
    ObjectId(id) {
        return new mongoose_1.Types.ObjectId(id);
    }
    saveData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new this.model(data).save();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    insertMany(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.insertMany(data, options);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    distinct(field, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.distinct(field, query);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    find(query, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find(query, projection, options).exec();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    findOne(query, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (options != undefined) {
                    options['lean'] = true;
                }
                else {
                    options = { lean: true };
                }
                return yield this.model.findOne(query, projection, options).exec();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    findOneAndUpdate(conditions, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (options != undefined) {
                    options['writeConcern'] = { w: 'majority', wtimeout: 5000 };
                }
                else {
                    options = { writeConcern: { w: 'majority', wtimeout: 5000 } };
                }
                return yield this.model.findOneAndUpdate(conditions, update, options).exec();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    aggregateData(aggregateArray, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.aggregate(aggregateArray, options).exec();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    paginationPipeline(page, limit) {
        const paginationQuery = [];
        if (page && limit) {
            paginationQuery.push({ $skip: (page - 1) * limit }, { $limit: limit });
        }
        else {
            paginationQuery.push({ $skip: 0 });
        }
        const pipeline = [
            {
                $facet: {
                    total: [{ $count: 'count' }],
                    rows: paginationQuery,
                },
            },
            {
                $unwind: {
                    path: '$total',
                    preserveNullAndEmptyArrays: false,
                },
            },
        ];
        return pipeline;
    }
    updateOne(query, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.updateOne(query, update, options).exec();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    updateMany(query, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.updateMany(query, update, options).exec();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    deleteMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.deleteMany(query);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.default = BaseEntity;
