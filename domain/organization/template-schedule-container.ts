import {ITemplateScheduleProperties} from "domain.schedule.template";
import {ITemplateSchedule} from "domain.schedule.template";
import {TemplateSchedule} from "../schedule/template/template-schedule";
export class TemplateScheduleContainer {
    private templateScheduleMap:{[index:string]: ITemplateScheduleProperties} = {};
    private templateScheduleNameChecker:{[index:string]: string} = {};

    public addTemplateSchedule(templateScheduleToAdd:ITemplateScheduleProperties):void {
        const matchingIdTemplateSchedule = this.templateScheduleMap[templateScheduleToAdd.id];
        const nameKey = this.nameKey(templateScheduleToAdd);
        if (matchingIdTemplateSchedule) {
            throw new Error('template schedule with same id has already been added to organization');
        } else if (this.templateScheduleNameChecker[nameKey]) {
            throw new Error('template schedule with same name is already a part of the organization');
        }
        this.templateScheduleMap[templateScheduleToAdd.id] = templateScheduleToAdd;
        this.templateScheduleNameChecker[nameKey] = nameKey;
    }

    public getTemplateSchedules():Array<ITemplateSchedule> {
        return Object.keys(this.templateScheduleMap).map((templateId:string):ITemplateSchedule => {
           return TemplateSchedule.templateSchedule(this.templateScheduleMap[templateId]);
        });
    }

    public getTemplateSchedule(templateScheduleId:string):ITemplateSchedule{
        return TemplateSchedule.templateSchedule(this.templateScheduleMap[templateScheduleId]);
    }

    public removeTemplateSchedule(templateScheduleId:string):void {
        var templateScheduleToRemove = this.templateScheduleMap[templateScheduleId];
        if(!templateScheduleToRemove){
            throw new Error('No template schedule exists to remove that matches template schedule id: '+ templateScheduleId);
        }
        delete this.templateScheduleNameChecker[templateScheduleId];
        delete this.templateScheduleMap[templateScheduleId];
    }

    public updateTemplateSchedule(updatedTemplateSchedule:ITemplateScheduleProperties):void {
        if(!this.templateScheduleMap[updatedTemplateSchedule.id]){
            throw new Error('No template schedule exists to update that matches template schedule id: ' + updatedTemplateSchedule.id);
        }
        this.templateScheduleMap[updatedTemplateSchedule.id] = updatedTemplateSchedule;
    }

    public nameKey(templateScheduleProps:ITemplateScheduleProperties):string {
        return templateScheduleProps.name;
    }

}