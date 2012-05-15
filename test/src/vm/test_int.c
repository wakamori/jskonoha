/****************************************************************************
 * Copyright (c) 2012, the Konoha project authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 ***************************************************************************/


#include "vmtest.h"
#define DEFINE_KMETHOD
#include "../../../src/konoha/methods.h"

static void test_add0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 10;
    }
    {
        /* reg5 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 20;
    }
    {
        /* reg1 = Int.add(10,20); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opADD;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%ld\n", sfp[0].ivalue);
        assert(sfp[0].ivalue == 30);
    }
}

static void test_sub0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 20;
    }
    {
        /* reg5 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }
    {
        /* reg1 = Int.sub(20,10); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opSUB;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%ld\n", sfp[0].ivalue);
        assert(sfp[0].ivalue == 10);
    }
}

static void test_mul0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 20;
    }
    {
        /* reg5 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }
    {
        /* reg1 = Int.mul(20,10); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opMUL;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%ld\n", sfp[0].ivalue);
        assert(sfp[0].ivalue == 200);
    }
}

static void test_div0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 20;
    }
    {
        /* reg5 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }
    {
        /* reg1 = Int.div(20,10); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opDIV;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%ld\n", sfp[0].ivalue);
        assert(sfp[0].ivalue == 2);
    }
}

static void test_mod0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg1 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 20;
    }
    {
        /* reg3 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }
    {
        /* reg1 = Int.mod(20,10); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opMOD;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%ld\n", sfp[0].ivalue);
        assert(sfp[0].ivalue == 0);
    }
}

static void test_eq0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 20;
    }
    {
        /* reg5 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }
    {
        /* reg1 = Int.eq(20,10); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opEQ;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%d\n", sfp[0].bvalue);
        assert(sfp[0].bvalue == 0);
    }
}

static void test_neq0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 20;
    }
    {
        /* reg5 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }
    {
        /* reg1 = Int.neq(20,10); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opNEQ;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%d\n", sfp[0].bvalue);
        assert(sfp[0].bvalue == 1);
    }
}

static void test_lt0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 20;
    }
    {
        /* reg5 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }
    {
        /* reg1 = Int.lt(20,10); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opLT;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%d\n", sfp[0].bvalue);
        assert(sfp[0].bvalue == 0);
    }
}

static void test_gt0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 20;
    }
    {
        /* reg5 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }
    {
        /* reg1 = Int.gt(20,10); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opGT;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%d\n", sfp[0].bvalue);
        assert(sfp[0].bvalue == 1);
    }
}

static void test_lte0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 20;
    }
    {
        /* reg5 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }
    {
        /* reg1 = Int.lte(20,10); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opLTE;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%d\n", sfp[0].bvalue);
        assert(sfp[0].bvalue == 0);
    }
}

static void test_gte0(konoha_t konoha, kopl_t opbuf[], kopl_t *pc)
{
    {
        klr_THCODE_t *op = OPCAST(THCODE, pc);
        op->th = thcode;
    }
    {
        /* reg3 = 20; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 1;
        op->n = 20;
    }
    {
        /* reg5 = 10; */
        klr_NSET_t *op = OPCAST(NSET, pc);
        op->a = 3;
        op->n = 10;
    }
    {
        /* reg1 = Int.gte(20,10); */
        klr_SCALL_t *op = OPCAST(SCALL, pc);
        struct _kMethod mtd;
        mtd.fcall_1 = Int_opGTE;
        op->uline = 1;
        op->thisidx = 0;
        op->espshift = 0;
        op->mtd = &mtd;
    }
    emit_ret(pc);
    {
        /* exit; */
        klr_EXIT_t *op = OPCAST(EXIT, pc);
        (void)op;
    }
    {
        ksfp_t sfp[10];
        pc = VirtualMachine_run(konoha, sfp, opbuf);
        VirtualMachine_run(konoha, sfp+K_CALLDELTA, pc);
        fprintf(stderr, "%d\n", sfp[0].bvalue);
        assert(sfp[0].bvalue == 1);
    }
}

int main(int argc, const char *argv[])
{
#define TEST(op) \
    do { \
        test_##op##0(konoha, opbuf, pc); \
        pc = opbuf; \
    } while (0)

    kopl_t opbuf[128], *pc = opbuf;
    konoha_t konoha = konoha_open();
    TEST(add);
    TEST(sub);
    TEST(mul);
    TEST(div);
    TEST(mod);
    TEST(eq);
    TEST(neq);
    TEST(lt);
    TEST(gt);
    TEST(lte);
    TEST(gte);
    konoha_close(konoha);
    MODGC_check_malloced_size();
    (void)Int_toString;
    (void)String_toInt;
    return 0;
#undef TEST
}
